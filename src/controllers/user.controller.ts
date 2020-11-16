import {Request, Response} from 'express';
import {user} from '../entity/user'
import {getRepository} from 'typeorm'
import * as bcrypt from 'bcrypt'

export async function getUsers(req:Request, res:Response){
    const users = await getRepository(user).find()
    res.json({"status":"OK", "user": users})
}

export async function createUser(req:Request, res:Response){
    const newPost = req.body
    const validedEmail = await getRepository(user)
                            .find({where: {email: newPost.email}})

    if(validedEmail.length > 0){
        res.json({"status":"Fail", "msg":`El email ${newPost.email} ya esta registrado`})
    }
    else{
        newPost.password = bcrypt.hashSync(newPost.password,10)
        const newUser = await getRepository(user).save(newPost)
        res.json({"status":"OK", "msg":"se registro correctamente", "user": newUser})       
    }
}

export async function getUser(req:Request, res:Response){
    let id = req.params.id
    const result = await getRepository(user).find({where: {id: id}})

    res.json({"result" : result})
}
