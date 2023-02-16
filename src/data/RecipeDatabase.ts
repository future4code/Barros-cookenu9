import { CustomError } from "../error/CustomError";
import { RecipeDTO } from "../model/recipeDTO";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase{
    private static TABLE_NAME: string = "Cookenu_recipe"

    create=async({id,title,description,idAuthor}:RecipeDTO)=>{
        try{

            await RecipeDatabase.connection.insert({
                id,
                title,
                description,
                id_author:idAuthor
            }).into(RecipeDatabase.TABLE_NAME)


        }catch(error:any){
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }
    getRecipes = async(id:string) => {
        try {
            let result = await RecipeDatabase.connection
            .select()
            .where('id_author', id)
            .from(RecipeDatabase.TABLE_NAME)
            return result
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
    }
}