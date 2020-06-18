import { Router, Response, Request } from "express";
import {
  createProject,
  getProjectsAssignedTo,
  getProjects,
  updateProject,
  getProjectById,
  deleteProject,
} from "../controllers/project.controller";
const router = Router();

router.get("/projects-assigned/:id", getProjectsAssignedTo);
router.get("/projects", getProjects);
router.get("/project/:id", getProjectById);
router.post("/project", createProject);
router.put("/project", updateProject);
router.delete("/project/:id", deleteProject);

export default router;
