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

    getAll = async()=>{
        try{
        const result = await UserDatabase.connection
        .select()
        .from(UserDatabase.TABLE_NAME)
        return (result)

        }catch(error:any){
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }

    public async findByEmail (email: string):Promise<UserDTO> {
        try {
            const user = await UserDatabase.connection
                         .select('*')
                         .where({email})
                         .into(UserDatabase.TABLE_NAME)

            return user[0];
        } catch (error:any) {
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }

    public async changePassword (id:string, newPassword:string) {
        try {
           await UserDatabase.connection
                 .where({id}) 
                 .update({password: newPassword})
                 .into(UserDatabase.TABLE_NAME)
        } catch (error:any) {
            throw new CustomError(400, error.message || error.sqlMessage);
        }
    }
}