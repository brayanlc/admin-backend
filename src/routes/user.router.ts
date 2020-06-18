import { Router } from "express";
import {
  signUp,
  signIn,
  getUsers,
  getUsersById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUsersById);
router.post("/user", signUp);
router.put("/user", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
