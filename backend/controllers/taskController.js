export const assignTaskToEmployee = async (req, res) => {
  try {
    const { agencyId, employeeId } = req.params;
    const { taskTitle, description, dueDate } = req.body;

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const newTask = new Task({
      employeeId,
      taskTitle,
      description,
      dueDate,
      status: 'assigned',
    });

    await newTask.save();
    res.status(201).json({ message: 'Task assigned successfully', newTask });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};