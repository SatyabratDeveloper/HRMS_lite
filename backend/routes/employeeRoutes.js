import express from "express";
import {
  addEmployee,
  getAllEmployees,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", addEmployee);
router.get("/", getAllEmployees);
router.delete("/:id", deleteEmployee);

export default router;

