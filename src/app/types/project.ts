export type Project = {
    _id?: String
    name: String,
    description:String,
    readme: String,
    originator:{
        _id?:String,
        name: String
    }
}