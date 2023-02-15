import { CustomError } from "../error/CustomError";
import { FollowDTO, InputFollowDTO } from "../model/followDTO";
import { BaseDatabase } from "./BaseDatabase";

export class FollowDatabase extends BaseDatabase {
    private static TABLE_NAME: string = "Cookenu_follow"

    create = async (input: FollowDTO): Promise<void> => {
        try {
            const { id, userId, followId } = input

            await FollowDatabase.connection.insert({
                id: id,
                user_id: userId,
                follow_id: followId
            }).into(FollowDatabase.TABLE_NAME)

        } catch (error: any) {
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }

    getAll = async ({ userId, followId }: InputFollowDTO) => {
        try {

            const result = await FollowDatabase.connection()
                .select("*")
                .from(FollowDatabase.TABLE_NAME)
                .where({
                   user_id: userId,
                   follow_id:followId
                })
                
                console.log(result[0]);
            return (result[0])

        } catch (error: any) {
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }
}