import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { CustomError } from "../error/CustomError";
import { InputUserDTO} from "../model/userDTO";


const userBusiness = new UserBusiness()

export class UserController {
    public signup = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body
  
            const insert: InputUserDTO = {
                name,
                email,
                password
            }

            const token = await userBusiness.signup(insert)
        
            res.status(201).send({ message: "Usuário criado!", token });

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}