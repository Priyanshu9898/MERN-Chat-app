import express from 'express';
import { register, login, setAvatar, allUsers } from '../Controllers/UserController.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/setAvatar/:id").post(setAvatar);
router.route("/allUsers/:id").get(allUsers);
export default router;