import { app } from "./app";
import { userRouter } from "./routes/userRouter";


// ENDPOINT CRIAR USUARIO
app.use("", userRouter)