import { app } from "./app";
import { followRouter } from "./routes/followRouter";
import { recipeRouter } from "./routes/recipeRouter";
import { userRouter } from "./routes/userRouter";


// ENDPOINT CRIAR USUARIO
app.use("", userRouter)


// ENDPOINT CRIAR RECEITA
app.use("", recipeRouter)

//ENDPOINT CRIAR SEGUIR
app.use("",followRouter)