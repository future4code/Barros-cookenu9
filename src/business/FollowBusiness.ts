import { FollowDatabase } from "../data/FollowDatabase";
import { CustomError } from "../error/CustomError";
import { FollowDTO, InputFollowDTO } from "../model/followDTO";
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
            if(followId === undefined){
                throw new CustomError(400, 'Fill in the fields "followId"');
            }
            const idUserToken = tokenGenerator.tokenData(userId)

            const idFollow = idGenerator.generateId()

            const verificationUserId = await followDatabase.getById({ userId: idUserToken.id, followId: followId })

            if (verificationUserId === undefined) {
               
                const insertFollow: FollowDTO = {
                    id: idFollow,
                    userId: idUserToken.id,
                    followId: followId
                }
    
                await followDatabase.create(insertFollow)
            }else{
                throw new CustomError(400, "Follow already exists");
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
    getAll = async () => {
        try {
            let result:FollowDTO[] = await followDatabase.getAll()
            if (result.length <= 0) {
                throw new CustomError(404, "No followers yet");
            }
            return result
        } catch (error) {
            
        }
    }
}




            // await followDatabase.create({
            //     id: idFollow,
            //     userId: idUserToken.id,
            //     followId: followId
            // })

