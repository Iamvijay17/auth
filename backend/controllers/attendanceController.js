// controllers/attendanceController.js
export const markAttendance = async (req, res) => {
  try {
    const { agencyId, employeeId } = req.params;
    const { status } = req.body; // 'present' or 'absent'

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const newAttendance = new Attendance({
      employeeId,
      status,
      date: new Date(),
    });

    await newAttendance.save();
    res.status(201).json({ message: 'Attendance marked successfully', newAttendance });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
