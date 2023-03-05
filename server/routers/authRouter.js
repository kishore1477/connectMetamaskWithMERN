import express from 'express';
import AuthController from '../controllers/authController.js';


 const authRouter = express.Router();

authRouter.post('/',AuthController.login);
export default authRouter