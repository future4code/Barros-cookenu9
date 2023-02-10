import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { InputUserDTO, UserDTO } from "../model/userDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();
const userDatabase = new UserDatabase();
export class UserBusiness {

    public signup = async ({ name, email, password }: InputUserDTO) => {
        try {
            if (!name || !email || !password) {
                throw new CustomError(400,'Fill in the fields "name", "email" and "password"');
            }
            if(name.length > 3){
                throw new CustomError(400,'Very short name');
            }

            if(password.length > 6){
                throw new CustomError(400,'Fill in the fields "name", "email" and "password"');
            }
            if (!email.includes("@")) {
                throw new CustomError(400, "Invalid email address");
            }

            const  id = idGenerator.generateId()

            const newUser:UserDTO = {
                id,
                name,
                email,
                password
            }

            await userDatabase.create(newUser)

            const token = tokenGenerator.generateToken({id:id})
            
            return (token)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }

    }
}