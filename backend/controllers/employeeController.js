import Employee from "../models/Employee.js";

export const addEmployee = async (req, res, next) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: employeeId, fullName, email, department",
      });
    }

    const existingEmployee = await Employee.findOne({
      $or: [{ employeeId }, { email: email.toLowerCase() }],
    });

    if (existingEmployee) {
      if (existingEmployee.employeeId === employeeId) {
        return res.status(409).json({
          success: false,
          message: "Employee ID already exists",
        });
      }
      if (existingEmployee.email.toLowerCase() === email.toLowerCase()) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    const employee = await Employee.create({
      employeeId,
      fullName,
      email: email.toLowerCase(),
      department,
    });

    res.status(201).json({
      success: true,
      data: employee,
      message: "Employee added successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    next(error);
  }
};

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await Employee.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }
    next(error);
  }
};

