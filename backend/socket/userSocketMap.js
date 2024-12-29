import jwt from 'jsonwebtoken';
import Message from '../models/Message.js'; // Adjusted path for Message model
import User from '../models/user.js'; // Adjusted import path for User model

const userSocketMap = {}; // Store userId to socketId mappings


// Exported function to handle user connections and message processing
export const handleUserConnections = (notificationNamespace) => {

    // Apply token validation middleware
    notificationNamespace.use((socket, next) => {
        const token = socket.handshake.auth.token; // Extract token from the handshake

        if (!token) {
            return next(new Error('Authentication error: Token is missing'));
        }

        // Verify the token using jwt.verify
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error('Authentication error: Invalid or expired token'));
            }

            if (!decoded.userId || !decoded.role) {
                return next(new Error('Authentication error: Token is invalid or missing role information'));
            }

            socket.user = decoded; // Attach the decoded user data to the socket object
            next(); // Proceed with the connection
        });
    });


    notificationNamespace.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        notificationNamespace.emit('newNotification', {
            notification: 'This is a new notification'
        });


        socket.on('setOnlineStatus', async (values) => {
            const { userId } = socket.user; // Assuming userId is a custom field like "usr-5b187bbbf6"
            try {
                // Use the custom field (e.g., userId or customUserId) in the query
                const updatedUser = await User.findOneAndUpdate(
                    { userId: userId }, // Query by custom field "userId"
                    { onlineStatus: true }, // Fields to update
                    { new: true } // Return the updated document
                );

                // If user is found, store socket ID
                if (updatedUser) {
                    userSocketMap[userId] = socket.id; // Store socket ID in userSocketMap
                    const users = await User.find({}, 'name avatar onlineStatus userId'); // Select only name, avatar, and onlineStatus
                    const userDetails = users.map(user => ({
                        userId: user.userId,
                        name: user.name,
                        avatar: user.avatar,
                        onlineStatus: user.onlineStatus,
                    }));

                    // Send the user details back to the client
                    socket.emit('allUsersDetails', userDetails);
                }
            } catch (error) {
                console.error('Error updating online status:', error);
            }
        });


        // Event listener for getting all users' details (optional, only if you want clients to be able to request this data)
        socket.on('getAllUsers', async () => {
            try {
                // Fetch all users' basic details from the database
                const users = await User.find({}, 'name avatar onlineStatus');
                const userDetails = users.map(user => ({
                    userId: user.userId,
                    name: user.name,
                    avatar: user.avatar,
                    onlineStatus: user.onlineStatus,
                }));

                // Send the user details back to the client
                socket.emit('allUsersDetails', userDetails);
            } catch (error) {
                console.error('Error fetching users details:', error);
                socket.emit('error', 'Failed to fetch users details');
            }
        });


        socket.on('sendMessage', async (data) => {
            const { message, receiverId, senderId } = data;

            // Basic validation
            if (!message || !receiverId || !senderId) {
                socket.emit('error', 'Invalid data received');
                return;
            }

            try {
                const newMessage = new Message({
                    message,
                    senderId,
                    receiverId,
                    status: 'sent',
                    timestamp: new Date(),
                });

                await newMessage.save(); // Save the message to get _id

                // Ensure receiver is connected before emitting
                if (userSocketMap[receiverId]) {
                    socket.to(userSocketMap[receiverId]).emit('receiveMessage', {
                        message,
                        senderId,
                        receiverId,
                        timestamp: new Date(),
                        messageId: newMessage._id,
                    });
                } else {
                    // Optionally handle the case where the receiver is offline
                    console.log('Receiver is offline:', receiverId);
                }
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('error', 'Failed to send message');
            }
        });

        socket.on('messageDelivered', async (messageId) => {
            try {
                await Message.findByIdAndUpdate(messageId, { status: 'delivered' });
                socket.emit('messageStatus', { messageId, status: 'delivered' });
            } catch (error) {
                console.error('Error updating message status:', error);
                socket.emit('error', 'Failed to update message status');
            }
        });

        socket.on('messageRead', async (messageId) => {
            try {
                await Message.findByIdAndUpdate(messageId, { status: 'read' });
                socket.emit('messageStatus', { messageId, status: 'read' });
            } catch (error) {
                console.error('Error updating message status:', error);
                socket.emit('error', 'Failed to update message status');
            }
        });

        // When a user disconnects, set their online status to false
        socket.on('disconnect', async () => {
            const userId = socket.user.userId;
            try {
                // Find the user by socket ID and update their online status
                const user = await User.findOne({ userId: userId }); // Assuming you store socketId with user
                if (user) {
                    await User.findByIdAndUpdate({ userId: userId }, { onlineStatus: false });
                    delete userSocketMap[user._id]; // Remove from userSocketMap
                    console.log(`User ${user._id} is now offline`);
                }
            } catch (error) {
                console.error('Error updating offline status:', error);
            }
        });
    });
};
