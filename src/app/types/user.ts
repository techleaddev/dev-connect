export type Users = {
    _id:String,
    first_name:String,
    last_name: String,
    email:String,
    password:String
}

export type TypeLoginResponse = {
    accessToken: String,
}