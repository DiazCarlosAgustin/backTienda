import { Request, Response } from "express";
import { user } from "../entity/user";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";

export async function getUsers(req: Request, res: Response) {
    await getRepository(user)
        .find()
        .then((result) => {
            res.json({ status: "OK", user: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function createUser(req: Request, res: Response) {
    const newPost = req.body;
    const validedEmail = await getRepository(user)
        .find({ where: { email: newPost.email } })
        .catch((err) => {
            console.log(err);
        });

    if (validedEmail != null) {
        res.json({
            status: "Fail",
            msg: `El email ${newPost.email} ya esta registrado`,
        });
    } else {
        newPost.password = bcrypt.hashSync(newPost.password, 10);
        await getRepository(user)
            .save(newPost)
            .then((newUser) => {
                res.json({
                    status: "OK",
                    msg: "se registro correctamente",
                    user: newUser,
                });
            })
            .catch((err) => {
                res.json({
                    status: "Fail",
                    msg: "No se registro correctamente, intente nuevamente",
                    err: err,
                });
            });
    }
}

export async function getUser(req: Request, res: Response) {
    let id = await req.params.id;
    await getRepository(user)
        .find({ where: { id: id } })
        .then((result) => {
            res.json({ result: result });
        });
}

export async function getUserLog(req: Request | any, res: Response) {
    let id = (await req.userId.id) || null;
    if (id > 0) {
        await getRepository(user)
            .find({ where: { id: id } })
            .then((result) => {
                res.json({ user: result[0] });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json("asd");
    }
}

export async function updateUser(req: Request | any, res: Response) {
    let id = await req.params.id;

    await getRepository(user)
        .createQueryBuilder("User")
        .update(req.body)
        .where("id = :id", { id: id })
        .execute()
        .then((result) => {
            if (result.raw.affectedRows > 0 && result.raw.warningCount === 0) {
                res.json({ "status": "OK", "msg": "Los cambios se guardaron correctamente." })
            }
            else { res.json({ "status": "FAIL", "msg": "No se pudieron guardar los cambios correctamente, intent nuevamente." }) }
        })
        .catch((err) => {
            console.log(err);
        });
}
