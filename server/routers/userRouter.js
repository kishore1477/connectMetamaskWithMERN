import express from 'express';

import UserController from '../controllers/userController.js';

 const userRouter = express.Router();

// userRouter.get('/',UserController.find);

// userRouter.get('/:userId',  UserController.get);

userRouter.post('/',UserController.create);

// userRouter.patch('/:userId',  UserController.patch);
export default userRouter