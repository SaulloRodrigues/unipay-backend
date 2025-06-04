import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js"
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.patch('/', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;