import { Request, Response, NextFunction } from "express";
import { user } from '../entity/user'
import * as jwt from 'jsonwebtoken'
import {getRepository} from 'typeorm'
import * as bcrypt from 'bcrypt'
import jwtConfig from "../Config/jwtConfig";

export async function login(req:Request, res:Response){
    let {email, password} = req.body
    
    if(!(email && password)){
        res.status(400).send()
    }
    
    const userRep = getRepository(user)
    let usuario:user = await userRep.findOneOrFail({where:{
            email
        }})
    
    if(!usuario){
        res.json({"error": "El mail ingresado es incorrecto."})
    }

    if(!usuario.comparePassword(password)){
        res.json({"error": "La contraseña ingresada es incorrecta."})
    }

    const token = jwt.sign({
        id: usuario.id, nombre: usuario.nombre, email: usuario.email
    }, jwtConfig.Secret)

    res.json({"token": token, "status": "OK", "msg":"Se ingreso correctamente.", "user": usuario})
}
export async  function isLog(req:Request|any, res:Response, next:NextFunction){
    if(!req.headers['usertoken']){
        res.json({"error": "token no valido."})
    }
    else{
        const token:any = req.headers['usertoken']
        let payload = null
        try{
            payload = jwt.decode(token)
        }catch(err){
            res.json({"error" : "Token invalido."})
        }
        req.userId = payload
    }
    next()
}