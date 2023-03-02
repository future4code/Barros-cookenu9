import { RecipeDTO } from "../model/recipeDTO";
import { BaseDatabase } from "./BaseDatabase";


export class FeedDatabase extends BaseDatabase {
    private static TABLE_NAME: string = "Cookenu_recipe"

    getFeed = async (id: string[]) => {
        try {
            let result: RecipeDTO[] = await FeedDatabase.connection
                .select()
                .whereIn('id_author', id)
                .from(FeedDatabase.TABLE_NAME)

            return result
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }
}