import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";

const recipeBusiness = new RecipeBusiness();

export class RecipeController {

    createRecipe = async (req: Request, res: Response) => {

        try {

            const idAuthor = req.headers.authorization as string
            const title = req.body.title as string
            const description = req.body.description as string

            const create = {
                title: title,
                description: description,
                idAuthor: idAuthor
            }

            await recipeBusiness.createRecipe(create)

            res.status(201).send({ message: "Recipe created successfully!" })
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    getRecipes = async (req: Request, res: Response) => {
        try {
            let token = req.headers.authorization as string
            let result = await recipeBusiness.getRecipes(token)
            res.status(200).send(result)
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }
}