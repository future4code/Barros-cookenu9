import { FeedDatabase } from "../data/FeedDatabase";
import { FollowDatabase } from "../data/FollowDatabase";
import { FollowDTO } from "../model/followDTO";
import { TokenGenerator } from "../services/TokenGenerator"

const feedDatabase = new FeedDatabase()
const tokenGenerator = new TokenGenerator();
const followDatabase = new FollowDatabase()
export class FeedBusiness {

    getFeed = async (token: string) => {
        try {
            let followers = []
            const tokenData = tokenGenerator.tokenData(token)

            let allFollowers: any = await followDatabase.getAll()
            allFollowers = JSON.parse(JSON.stringify(allFollowers))

            for (let index = 0; index < allFollowers.length; index++) {
                const element = allFollowers[index];
                if (element.user_id === tokenData.id) {
                    followers.push(element.follow_id)
                }

            }

            let result = await feedDatabase.getFeed(followers)
            if (result.length <= 0) {
                return ("Feed is empty.");
            } else {
                return ({recipes: result})
            }
            
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }
}