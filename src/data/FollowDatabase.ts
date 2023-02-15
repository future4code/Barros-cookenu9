import { CustomError } from "../error/CustomError";
import { FollowDTO } from "../model/followDTO";
import { BaseDatabase } from "./BaseDatabase";

export class FollowDatabase extends BaseDatabase {
    private static TABLE_NAME: string = "Cookenu_follow"

    create = async ({ id, userId, followId }: FollowDTO) => {
        try {
            await FollowDatabase.connection.insert({
                id: id,
                user_id: userId,
                follow_id: followId
            }).into(FollowDatabase.TABLE_NAME)

        } catch (error: any) {
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }
}