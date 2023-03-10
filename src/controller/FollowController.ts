import { Request, Response } from "express";
import { FollowBusiness } from "../business/FollowBusiness";
import { InputFollowDTO } from "../model/followDTO";

const followBusiness = new FollowBusiness();

export class FollowController {
    createFollow = async (req: Request, res: Response): Promise<void> => {
        try {

            const userId = req.headers.authorization as string;
            const followId = req.body.followId

            const create: InputFollowDTO = {
                userId: userId,
                followId: followId
            }

            await followBusiness.createFollow(create)

            res.status(201).send({ message: "The user is now a follower!" })

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
    getAll = async (req: Request, res: Response) => {
        try {
            let result = await followBusiness.getAll()
            res.status(200).send(result)
        } catch (error: any) {
            res.status(400).send(error.message);

        }
    }

    deleteFollow = async (req: Request, res: Response) => {
        try {
            const userId = req.headers.authorization as string;
            const followId = req.body.followId

            await followBusiness.deleteFollow({userId,followId})

            res.status(200).send("Unfollowed successfully!")

        } catch (error: any) { 
            res.status(400).send(error.message);
        }
    }
}