import express from "express";
import { FollowController } from "../controller/FollowController";


export const followRouter = express.Router()
const followController = new FollowController()


// ENDPOINT CRIAR RECEITA
followRouter.post("/follow", followController.createFollow)

followRouter.get("/all-followers", followController.getAll)

followRouter.delete("/unfollow", followController.deleteFollow)