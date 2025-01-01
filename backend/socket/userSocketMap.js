import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';
import User from '../models/user.js';

const userSocketMap = {};

export const handleUserConnections = (notificationNamespace) => {
    notificationNamespace.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication error: Token is missing'));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error('Authentication error: Invalid or expired token'));
            }

            const { userId, role } = decoded;
            if (!userId || !role) {
                return next(new Error('Authentication error: Token is invalid or missing role information'));
            }

            socket.user = decoded;
            next();
        });
    });

    notificationNamespace.on('connection', (socket) => {
        const { userId } = socket.user;
        console.log(`User connected: ${userId}`);

        userSocketMap[userId] = socket.id;

        User.findByIdAndUpdate(userId, { onlineStatus: true }, { new: true })
            .then(() => {
                notificationNamespace.emit('userStatusChange', { userId, online: true });
            })
            .catch((err) => console.error('Error updating online status:', err));

        socket.on('getRecentChats', async () => {
            try {
                const recentChats = await Message.aggregate([
                    {
                        $match: { $or: [{ senderId: userId }, { receiverId: userId }] },
                    },
                    {
                        $sort: { timestamp: -1 },
                    },
                    {
                        $group: {
                            _id: {
                                chatWith: {
                                    $cond: [{ $eq: ['$senderId', userId] }, '$receiverId', '$senderId'],
                                },
                            },
                            lastMessage: { $first: '$message' },
                            lastMessageTime: { $first: '$timestamp' },
                            lastMessageSender: { $first: '$senderId' },
                        },
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: '_id.chatWith',
                            foreignField: 'userId',
                            as: 'chatUser',
                        },
                    },
                ]);

                const formattedChats = recentChats.map((chat) => ({
                    chatWith: chat._id.chatWith,
                    lastMessage: chat.lastMessage,
                    lastMessageTime: chat.lastMessageTime,
                    lastMessageSender: chat.lastMessageSender,
                    chatUser: {
                        ...chat.chatUser[0],
                        _id: undefined,
                        __v: undefined,
                        password: undefined,
                    },
                }));

                socket.emit('recentChats', formattedChats);
            } catch (error) {
                console.error('Error fetching recent chats:', error);
                socket.emit('error', 'Failed to fetch recent chats');
            }
        });

        socket.on('getChatHistory', async ({ receiverId }, callback) => {
            try {
                const chatHistory = await Message.aggregate([
                    {
                        $match: {
                            $or: [
                                { senderId: userId, receiverId },
                                { senderId: receiverId, receiverId: userId },
                            ],
                        },
                    },
                    { $sort: { timestamp: 1 } },
                    {
                        $project: {
                            _id: 0,
                            __v: 0

                        },
                    },
                ]);

                callback(chatHistory);
            } catch (error) {
                console.error('Error fetching chat history:', error);
                socket.emit('error', 'Failed to fetch chat history');
            }
        });

        socket.on('sendMessage', async (data) => {
            const { message, receiverId, timestamp } = data;

            if (!message || !receiverId) {
                socket.emit('error', 'Invalid data received');
                return;
            }

            try {
                const newMessage = await Message.create({
                    message,
                    senderId: userId,
                    receiverId,
                    status: 'sent',
                    timestamp: timestamp || new Date(),
                });

                if (userSocketMap[receiverId]) {
                    notificationNamespace
                        .to(userSocketMap[receiverId])
                        .emit('receiveMessage', { ...newMessage.toObject() });
                } else {
                    console.log(`Receiver ${receiverId} is offline.`);
                }
            } catch (error) {
                console.error('Error sending message:', error);
                socket.emit('error', 'Failed to send message');
            }
        });

        socket.on('messageRead', async (messageId) => {
            try {
                const message = await Message.findByIdAndUpdate(messageId, { status: 'read' }, { new: true });

                socket.emit('messageStatus', { messageId, status: 'read' });

                if (message && userSocketMap[message.senderId]) {
                    notificationNamespace
                        .to(userSocketMap[message.senderId])
                        .emit('messageStatus', { messageId, status: 'read' });
                }
            } catch (error) {
                console.error('Error updating message status:', error);
                socket.emit('error', 'Failed to update message status');
            }
        });

        socket.on('deleteMessage', async (messageId) => {
            try {
                const deletedMessage = await Message.findByIdAndDelete(messageId);

                if (deletedMessage) {
                    notificationNamespace
                        .to(userSocketMap[deletedMessage.receiverId])
                        .emit('messageDeleted', { messageId });
                }

                socket.emit('messageDeleted', { messageId });
            } catch (error) {
                console.error('Error deleting message:', error);
                socket.emit('error', 'Failed to delete message');
            }
        });

        socket.on('disconnect', async () => {
            try {
                await User.findByIdAndUpdate(userId, { onlineStatus: false });
                delete userSocketMap[userId];

                notificationNamespace.emit('userStatusChange', { userId, online: false });
                console.log(`User ${userId} disconnected`);
            } catch (error) {
                console.error('Error updating offline status:', error);
            }
        });
    });
};
