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
            if (followId === undefined) {
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
            } else {
                throw new CustomError(400, "User is already following this person.");
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
    getAll = async () => {
        try {
            let result: FollowDTO[] = await followDatabase.getAll()
            if (result.length <= 0) {
                throw new CustomError(404, "No followers yet");
            }
            return result
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    deleteFollow=async({userId,followId}:InputFollowDTO)=>{
        try{
            
            if (!userId ) {
                throw new CustomError(400, "invalid!  userId");
            }
            if (!followId) {
                throw new CustomError(400, "invalid!  followId");
            }

            const idUserToken = tokenGenerator.tokenData(userId)

            const verificationUserId = await followDatabase.getFollow({userId:idUserToken.id, followId})


            if (verificationUserId === undefined) {
                throw new CustomError(400, "Is not possible to delete a relation that do not exists.");
            } else {
                await followDatabase.delete({userId:idUserToken.id, followId})
            }

        }catch(error:any){
            throw new CustomError(400, error.message);
        }
    }
}
