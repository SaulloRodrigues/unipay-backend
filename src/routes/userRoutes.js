import { createUser, deleteUser, getAllUsers, getUser, loginUser, updateUser } from "../controllers/userController.js"
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;