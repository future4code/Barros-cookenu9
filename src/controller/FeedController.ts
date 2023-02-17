import { Request, Response } from "express";
import { FeedBusiness } from "../business/FeedBusiness";


const feedBusiness = new FeedBusiness()
export class FeedController {
    getFeed = async(req:Request, res:Response) => {
        try {
            let token = req.headers.authorization as string
            let result = await feedBusiness.getFeed(token)
            
            
            res.status(200).send(result)
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
    }
}