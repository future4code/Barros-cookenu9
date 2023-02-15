import { app } from "./app";
import { recipeRouter } from "./routes/recipeRouter";
import { userRouter } from "./routes/userRouter";


// ENDPOINT CRIAR USUARIO
app.use("", userRouter)


// ENDPOINT CRIAR RECEITA
app.use("", recipeRouter)