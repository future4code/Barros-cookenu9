import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { UserIncompleteData, UserIncorrectPassword, UserInvalidEmail, UserInvalidPassword, UserNotFound } from "../error/UserErrors";
import { InputUserDTO, UserDTO, userLoginDTO } from "../model/userDTO";
import { HashGenerator } from "../services/HashGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

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

    public async login ({email, password}:userLoginDTO ) {
        try {
            if(!email || !password) {
                throw new UserIncompleteData()
            }
            if (!email.includes("@" )) {
                throw new UserInvalidEmail()
            }
            if (password.length <= 6) {
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
}