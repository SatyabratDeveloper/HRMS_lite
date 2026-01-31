import express from "express";
import {
  markAttendance,
  getEmployeeAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/", markAttendance);
router.get("/:employeeId", getEmployeeAttendance);

export default router;

