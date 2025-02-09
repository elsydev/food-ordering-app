import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
const router = express.Router();

//api/my/user
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, MyUserController.updateCurrentUser);

export default router;
