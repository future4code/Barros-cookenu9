import express from "express";
import { RecipeController } from "../controller/RecipeController";

export const recipeRouter = express.Router()
const recipeController = new RecipeController()


// ENDPOINT CRIAR RECEITA
recipeRouter.post("/recipe", recipeController.createRecipe)