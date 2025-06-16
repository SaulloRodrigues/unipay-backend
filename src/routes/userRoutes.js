import { createUser, deleteUser, getAllUsers, getUser, getUserWithEmail, loginUser, updateUser } from "../controllers/userController.js"
import { Router } from 'express';
import { verifyJWT } from "../middlewares/verifyJWT.js";

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/email/:email', getUserWithEmail);
userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
// Rotas seguras (Autenticação JWT)
userRouter.get('/:id', verifyJWT, getUser);
userRouter.put('/', verifyJWT, updateUser);
userRouter.delete('/', verifyJWT, deleteUser);

export default userRouter;