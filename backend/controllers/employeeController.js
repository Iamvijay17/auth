export const addEmployeeToTravelAgency = async (req, res) => {
  try {
    const { id } = req.params; // Travel agency ID
    const { name, email, role } = req.body; // Employee details

    const travelAgency = await TravelAgency.findById(id);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const newEmployee = new Employee({
      travelAgencyId: id,
      name,
      email,
      role,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', newEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getEmployeesForTravelAgency = async (req, res) => {
  try {
    const { id } = req.params; // Travel agency ID

    const travelAgency = await TravelAgency.findById(id);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employees = await Employee.find({ travelAgencyId: id });

    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found for this travel agency' });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateEmployeeDetails = async (req, res) => {
  try {
    const { agencyId, employeeId } = req.params;
    const { name, email, role } = req.body;

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.role = role || employee.role;

    await employee.save();
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteEmployeeFromTravelAgency = async (req, res) => {
  try {
    const { agencyId, employeeId } = req.params;

    const travelAgency = await TravelAgency.findById(agencyId);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    await employee.remove();
    res.status(200).json({ message: 'Employee removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};