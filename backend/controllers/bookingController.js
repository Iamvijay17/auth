import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { destinationId, bookingDate, startDate, endDate, numberOfGuests, totalPrice } = req.body;

    const newBooking = new Booking({
      userId: req.user.userId,
      destinationId,
      bookingDate,
      startDate,
      endDate,
      numberOfGuests,
      totalPrice,
    });

    console.log(newBooking);
    const savedBooking = await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email').populate('destinationId', 'name location').select(' -_id -__v');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('destinationId', 'name location');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update booking status (Admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({ message: 'Booking status updated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
