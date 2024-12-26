export const applyForLeave = async (req, res) => {
  try {
    const { agencyId, employeeId } = req.params;
    const { leaveType, fromDate, toDate } = req.body; // Leave details

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const newLeaveRequest = new Leave({
      employeeId,
      leaveType,
      fromDate,
      toDate,
      status: 'pending', // Initially pending
    });

    await newLeaveRequest.save();
    res.status(201).json({ message: 'Leave application submitted successfully', newLeaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getLeaveBalance = async (req, res) => {
  try {
    const { agencyId, employeeId } = req.params;

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const leavesTaken = await Leave.find({ employeeId, status: 'approved' });
    const totalLeaves = 20; // assuming 20 annual leaves
    const remainingLeaves = totalLeaves - leavesTaken.length;

    res.status(200).json({ message: 'Leave balance fetched successfully', remainingLeaves });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};