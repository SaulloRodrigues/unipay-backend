import { obterUsuarios } from "../controllers/userController.js"

const userRoutes = (app) => {
    app.get('/users', obterUsuarios);
}

export default userRoutes;