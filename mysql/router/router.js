import express from "express";
import * as employees from "../employees/employees.js";
const router = express.Router();

router.get("/employees", employees.list);
router.get("/employees/:id", employees.read);

export default router;
