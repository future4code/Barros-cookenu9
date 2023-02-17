import { CustomError } from "./CustomError";

export class UserIncompleteData extends CustomError {
    constructor () {
        super(422, 'Fill in the fields: "email" and "password" ')
    }
} 

export class UserMissingEmail extends CustomError {
    constructor() {
        super(422, "You must send the email")
    }
}


export class UserInvalidEmail extends CustomError {
    constructor() {
        super(422, "Invalid Email")
    }
}

export class UserInvalidPassword extends CustomError {
    constructor() {
        super(422, "Password must contain at least 6 characters.")
    }
}

export class UserNotFound extends CustomError {
    constructor() {
        super(404, "User not found!")
    }
}

export class UserIncorrectPassword extends CustomError {
    constructor() {
        super(401, "Unauthorized: Incorrect password.")
    }
}
