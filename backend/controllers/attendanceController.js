import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

export const markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: employeeId, date, status",
      });
    }

    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either Present or Absent",
      });
    }

    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      employee: employee._id,
      date: attendanceDate,
    });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();

      return res.status(200).json({
        success: true,
        data: existingAttendance,
        message: "Attendance updated successfully",
      });
    }

    const attendance = await Attendance.create({
      employee: employee._id,
      date: attendanceDate,
      status,
    });

    await attendance.populate("employee", "employeeId fullName email department");

    res.status(201).json({
      success: true,
      data: attendance,
      message: "Attendance marked successfully",
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
      return res.status(409).json({
        success: false,
        message: "Attendance already marked for this date",
      });
    }

    next(error);
  }
};

export const getEmployeeAttendance = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const attendance = await Attendance.find({ employee: employee._id })
      .sort({ date: -1 })
      .populate("employee", "employeeId fullName email department");

    const presentDays = attendance.filter((a) => a.status === "Present").length;
    const absentDays = attendance.filter((a) => a.status === "Absent").length;

    res.status(200).json({
      success: true,
      data: {
        employee: {
          employeeId: employee.employeeId,
          fullName: employee.fullName,
          email: employee.email,
          department: employee.department,
        },
        attendance,
        summary: {
          totalDays: attendance.length,
          presentDays,
          absentDays,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

