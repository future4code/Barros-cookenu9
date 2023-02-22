import { RecipeDatabase } from "../data/RecipeDatabase";
import { CustomError } from "../error/CustomError";
import { InputRecipeDTO } from "../model/recipeDTO";
import { AuthenticationData } from "../model/userDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const tokenGenerator = new TokenGenerator();
const idGenerator = new IdGenerator();
const recipeDatabase = new RecipeDatabase();

export class RecipeBusiness {

    createRecipe = async (input: InputRecipeDTO) => {
        try {

            const { title, description, idAuthor } = input

            if (!title || !description) {
                throw new CustomError(400, 'Fill in the fields "title" and "description"');
            }

            const idUser = tokenGenerator.tokenData(idAuthor)

            const id = idGenerator.generateId()

            await recipeDatabase.create({
                id: id,
                title: title,
                description: description,
                idAuthor: idUser.id
            })

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    getRecipes = async (token: string) => {
        try {
            if (!token) {
                throw new Error("Missing authorization");
            }
            let id: AuthenticationData = tokenGenerator.tokenData(token)
            return await recipeDatabase.getRecipes(id.id)
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }
}