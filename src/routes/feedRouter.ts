import express from "express";
import { FeedController } from "../controller/FeedController";

export const feedRouter = express.Router()
const feedController = new FeedController()

feedRouter.get("/my-feed", feedController.getFeed)