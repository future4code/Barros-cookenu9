import { CustomError } from "../error/CustomError";
import { UserDTO } from "../model/userDTO";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME= "Cookenu_users"

    create = async ({id,name,email,password}:UserDTO):Promise<void>=>{
        try{
            await UserDatabase.connection
            .insert({
                id,
                name,
                email,
                password
            }).into(UserDatabase.TABLE_NAME)

        }catch(error:any){
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }

    getAll = async(email:string)=>{
        try{
        const result = await UserDatabase.connection.raw(`
            SELECT email FROM ${UserDatabase.TABLE_NAME} WHERE email=${email}
        `)
        return (result)

        }catch(error:any){
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }
}