import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router()
const userController = new UserController()


// ENDPOINT CRIAR USUARIO
userRouter.post("/signup", userController.signup)

//ENDPOINT FAZER LOGIN
userRouter.post("/login", userController.login)

//ENDPOINT PARA ENVIAR UMA SENHA NOVA POR EMAIL - ESQUECI MINHA SENHA
userRouter.put("/forgot-password", userController.forgotPassword)