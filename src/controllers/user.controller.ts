import { Request, Response } from "express";
import { user } from "../entity/user";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";


/**
 * *Retorno todos los usuarios
 * @param req Request
 * @param res Response
 */
export async function getUsers(req: Request, res: Response): Promise<void> {
    try {
        // *Intento traer todas los users
        await getRepository(user)
            .find()
            .then((result) => {
                res.json({ status: "OK", user: result });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    catch (err) {
        // !en caso que falle retorna el error
        console.error(err)
        res.status(404).json({
            error: err
        })
    }
}

/**
 * *Creo un usuario
 * @param req 
 * @param res 
 */
export async function crearUser(req: Request, res: Response): Promise<void> {
    try {
        const newPost = req.body; // *Obtengo los parametros del Form
        /**
         * *Valido el mail para ver si existe o no.
         */
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
            // ? encripto la contraseña
            newPost.password = bcrypt.hashSync(newPost.password, 10);
            // *Le paso el usuario para crear
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
    catch (err) {
        // !en caso que falle retorna el error
        console.error(err)
        res.status(404).json({ error: err })
    }

}

//* Obtengo 1 usuario
export async function getUser(req: Request, res: Response): Promise<void> {
    try {
        let id = await req.params.id;
        await getRepository(user)
            .find({ where: { id: id } })
            .then((result) => {
                res.json({ result: result });
            });
    } catch (err) {
        // !en caso que falle retorna el error
        console.error(err)
        res.status(404).json({ error: err })
    }
}

// *Retorno el usuario logueado
export async function getUserLog(req: Request | any, res: Response): Promise<void> {
    // ? Tomo el id del usuario logueado
    if (req.userId?.id != null) {
        try {
            // *Obtengo la data del usuario logueado
            await getRepository(user)
                .find({ where: { id: req.userId.id } })
                .then((result) => {
                    res.json({ user: result[0] });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        catch (err) {
            // !en caso que falle retorna el error
            console.error(err)
            res.status(404).json({
                error: err
            })
        }
    }
    else {
        res.json({
            user: null
        })
    }
}

// * Actualizar el usuario (MENOS: PASSWORD)
export async function updateUser(req: Request | any, res: Response): Promise<void> {
    try {
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
    catch (err) {
        // !en caso que falle retorna el error
        console.error(err)
        res.status(404).json({
            error: err
        })
    }
}
/**
 * TODO: crear la funcion de delete
 */