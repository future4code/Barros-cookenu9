import { app } from "./app";
import { feedRouter } from "./routes/feedRouter";
import { followRouter } from "./routes/followRouter";
import { recipeRouter } from "./routes/recipeRouter";
import { userRouter } from "./routes/userRouter";


// ENDPOINT CRIAR USUARIO
app.use("/user", userRouter)


// ENDPOINT CRIAR RECEITA
app.use("/recipe", recipeRouter)

//ENDPOINT CRIAR SEGUIR
app.use("/followers",followRouter)



//ENDPOINT FEED

app.use("/feed", feedRouter)