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
        case 'GET':
            return checkJWT(req,res);
        default:
            return res.status(200).json({
                message:'Bad request'
            })
    }
}

const checkJWT = async(req: NextApiRequest, res: NextApiResponse<Data>)=> {

    const { token = '' } = req.cookies;

    let userId = '';
    try {
        userId = await jwt.isValidToken(token);
    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorización no es válido'
        })
    }

    await db.connect();
    const user = await User.findById(userId).lean();

    if(!user){
        return res.status(400).json({message:'Correo o contraseña incorrecta'})
    }


    const { _id, email, role, name } = user;

    return res.status(200).json({
        token:jwt.signToken(_id,email),
        user:{
            email, 
            role, 
            name
        }
    });
}
