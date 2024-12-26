export const addPerformanceReview = async (req, res) => {
  try {
    const { agencyId, employeeId } = req.params;
    const { review, rating } = req.body; // Employee performance review and rating (1 to 5 scale)

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const newReview = new PerformanceReview({
      employeeId,
      review,
      rating,
      date: new Date(),
    });

    await newReview.save();
    res.status(201).json({ message: 'Performance review added successfully', newReview });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getEmployeePerformance = async (req, res) => {
  try {
    const { agencyId, employeeId } = req.params;

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    // Assuming the performance metrics are calculated based on the number of bookings and feedback
    const bookingsHandled = await Booking.countDocuments({ employeeId });
    const feedbackReceived = await Feedback.countDocuments({ employeeId });

    const performanceMetrics = {
      bookingsHandled,
      feedbackReceived,
      rating: (feedbackReceived > 0) ? (bookingsHandled / feedbackReceived) : 0,
    };

    res.status(200).json({ message: 'Performance metrics fetched successfully', performanceMetrics });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};