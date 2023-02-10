import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

export class UserBusiness{
    idGenerator = new IdGenerator();
    tokenGenerator = new TokenGenerator();
    userDatabase = new UserDatabase();

    public createUser = async ()=>{
        try{

            

        }catch(error:any){
            throw new CustomError(400, error.message);
        }

    }
}