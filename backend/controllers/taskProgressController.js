export const updateTaskProgress = async (req, res) => {
  try {
    const { agencyId, employeeId, taskId } = req.params;
    const { progress } = req.body; // Task progress (percentage or status)

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.progress = progress;
    await task.save();

    res.status(200).json({ message: 'Task progress updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

