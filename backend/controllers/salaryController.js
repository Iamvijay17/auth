export const setEmployeeSalary = async (req, res) => {
  try {
    const { agencyId, employeeId } = req.params;
    const { basicSalary, bonus, deductions } = req.body; // Salary details

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const salary = new Salary({
      employeeId,
      basicSalary,
      bonus,
      deductions,
      totalSalary: basicSalary + bonus - deductions,
    });

    await salary.save();
    res.status(201).json({ message: 'Salary details added successfully', salary });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

