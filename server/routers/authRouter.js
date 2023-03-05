import express from 'express';

import * as controllers from './authController.js';

 const authRouter = express.Router();

authRouter.post('/',controllers.login);
export default authRouter