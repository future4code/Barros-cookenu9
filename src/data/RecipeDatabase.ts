import { CustomError } from "../error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase{
    private static TABLE_NAME: string = "Cookenu_recipe"

    create=async()=>{
        try{


        }catch(error:any){
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }
}