import mongoose,{model,Model} from "mongoose";
import { IUser } from "../interfaces/user";

const userShema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{
        type:String,
        enum:{
            values:["admin","client"],
            message:"{VALUE} no es un role válido",
            default:"client",
            required:true
        },
    },
},{
    timestamps:true
});

const User:Model<IUser> = mongoose.models.User || model("User",userShema);

export default User;