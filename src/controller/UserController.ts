import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { InputUserDTO } from "../model/userDTO";


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

            res.status(201).send(`"access_token": "${token}" `);

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const token = await userBusiness.login({ email, password })

            res.status(200).send({ token: token })

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const email: string = req.body.email
            await userBusiness.forgotPassword(email)
            res.status(200).send({ message: "A new password has been sent to the email." })
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let result = await userBusiness.getAll()
            res.status(200).send(result)
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            let token = req.headers.authorization as string
            let result = await userBusiness.getById(token)
            res.status(200).send(result)
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }
}