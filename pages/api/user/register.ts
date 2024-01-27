import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import { db } from "../../../database";
import { User } from "../../../models";
import { jwt } from "../../../utils";

type Data=
| { message:string }
| {
    token:string,
    user:{
        email:string,
        role:string,
        name:string
    }   
}

export default function haddler(req:NextApiRequest,res:NextApiResponse<Data>){

    switch(req.method){
        case 'POST':
            return registerUser(req,res);
        default:
            return res.status(200).json({
                message:'Bad request'
            })
    }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>)=> {
    const { email='',password='',name='' } = req.body;

    await db.connect();

    if(password.length < 6){
        return res.status(400).json({
            message:'La contraseña debe tener al menos 6 caracteres'
        })
    }

    if(name.length < 2){
        return res.status(400).json({
            message:'El nombre debe tener al menos 2 caracteres'
        })
    }

    await db.connect();
    const user = await User.findOne({email});

    if(user){
        return res.status(400).json({
            message:'El correo ya está registrado'
        })
    }

    const newUser = new User({
        email:email.toLowerCase(),
        password:bcrypt.hashSync(password),
        role:'client',
        name
    });

    try{
        await newUser.save({validateBeforeSave:true});

    }catch(error){
        return res.status(500).json({
            message:'Revisar logs del servidor'
        })
    }

    const {role,_id} = newUser;

    const token = jwt.signToken(_id,email);

    return res.status(200).json({
        token,
        user:{
            email, role, name
        }
    });
}