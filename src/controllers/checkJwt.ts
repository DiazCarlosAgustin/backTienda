import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import config from  '../Config/jwtConfig'

export const checkJwt = (req: Request, res: Response, next: NextFunction) =>{
    const token = <string>req.headers["token_id"]

    let jwtPayload

    try {
        jwtPayload = <any>jwt.verify(token, config.Secret)
        res.locals.jwtPayload = jwtPayload
    } catch (error) {
        res.status(400).send()
        return
    }

    const { id, nombre, email } = jwtPayload;
    const newToken = jwt.sign({ id, nombre, email }, config.Secret);
    res.json({"newToken": newToken})
    next();
}