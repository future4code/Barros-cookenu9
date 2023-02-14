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
            })


        }catch(error:any){
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }
}