import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { UserMissingEmail, UserIncompleteData, UserIncorrectPassword, UserInvalidEmail, UserInvalidPassword, UserNotFound } from "../error/UserErrors";
import { AuthenticationData, InputUserDTO, UserDTO, userLoginDTO } from "../model/userDTO";
import { HashGenerator } from "../services/HashGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { passwordGenerate } from "../utils/passwordGenerate";
import sendNodemailer from "../services/Nodemailer"

const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();
const userDatabase = new UserDatabase();
const hashGenerator = new HashGenerator();
export class UserBusiness {

    public signup = async ({ name, email, password }: InputUserDTO) => {
        try {
            if (!name || !email || !password) {
                throw new CustomError(400,'Fill in the fields "name", "email" and "password"');
            }
            if(name.length < 3){
                throw new CustomError(400,'Very short name');
            }

            if(password.length <= 6){
                throw new CustomError(400,'Invalid password');
            }
            if (!email.includes("@")) {
                throw new CustomError(400, "Invalid email address");
            }
            // const verificationEmail = await userDatabase.getAll(email)

            // if(verificationEmail){
            //     throw new CustomError(400, "Already have this email");
            // }

            const  id = idGenerator.generateId()

            const passwordHash = await hashGenerator.generateHash(password)

            const newUser:UserDTO = {
                id,
                name,
                email,
                password: passwordHash
            }

            await userDatabase.create(newUser)

            const token = tokenGenerator.generateToken({id})

            return (token)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }

    }

    public async login ({email, password}:userLoginDTO ):Promise<string> {
        try {
            if(!email || !password) {
                throw new UserIncompleteData()
            }
            if (!email.includes("@" )) {
                throw new UserInvalidEmail()
            }
            if (password.length <= 5) {
                throw new UserInvalidPassword()
            }

            const user = await userDatabase.findByEmail(email)

            if(!user) {
                throw new UserNotFound()
            }

            const comparePassword: boolean = await hashGenerator.compareHash(password, user.password)

            if (!comparePassword) {
                throw new UserIncorrectPassword()
            }

            const token = await tokenGenerator.generateToken({id: user.id})
            
            return token;

        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    public async forgotPassword (email: string): Promise<void> {
        try {
            if(!email) {
                throw new UserMissingEmail()
            }

            if(!email.includes('@')) {
                throw new UserInvalidEmail()
            }

           const user = await userDatabase.findByEmail(email);
           if (!user) {
            throw new UserNotFound;
           } 

           const newPassword = passwordGenerate().toString()
           const passwordHash = await hashGenerator.generateHash(newPassword)
           await userDatabase.changePassword(user.id, passwordHash);
           await sendNodemailer(email, newPassword)
           
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    getAll = async() => {
        try {
            return await userDatabase.getAll()
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
        }

    }

    getById = async(token:string) => {
        try {
            if (!token) {
                throw new Error("Missing authorization");
            }
            let id:AuthenticationData = tokenGenerator.tokenData(token)
            let userId:any = await userDatabase.checkIfExists(id.id)
            userId=JSON.parse(JSON.stringify(userId))
            
            if (userId[0].id !== id.id) {
                throw new CustomError(400, "Token is invalid");
            }
            return await userDatabase.getById(id.id)
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }
}