import { FollowDatabase } from "../data/FollowDatabase";
import { CustomError } from "../error/CustomError";
import { InputFollowDTO } from "../model/followDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const tokenGenerator = new TokenGenerator();
const idGenerator = new IdGenerator();
const followDatabase = new FollowDatabase();

export class FollowBusiness {

    createFollow = async (input: InputFollowDTO): Promise<void> => {
        try {
            const { userId, followId } = input

            if (!followId) {
                throw new CustomError(400, 'Fill in the fields "followId"');
            }

            const idUserToken = tokenGenerator.tokenData(userId)
            // console.log(idUserToken.id);
            
            const idFollow = idGenerator.generateId()

            await followDatabase.create({
                id: idFollow,
                userId: idUserToken.id,
                followId: followId
            })

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}