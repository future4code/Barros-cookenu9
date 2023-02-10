import { InputUserDTO } from "../model/userDTO";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME= "cookenu_users"

    create = async ({id,name,email,password}:InputUserDTO):Promise<void>=>{
        try{
            await UserDatabase.connection
            .insert({id,name,email,password})
            .into(UserDatabase.TABLE_NAME)

        }catch(error:any){

        }
    }
}