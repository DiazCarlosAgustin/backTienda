import { Request, Response } from "express";
import { categoria } from "../entity/categoria";
import { getRepository } from "typeorm";


/**
 * TODO: crear funciones para el manejo de la misma.
 */
/**
 * *retorna todos las categorias
 * @param req 
 * @param res 
 */
export async function getCategorias(req: Request, res: Response): Promise<void> {
    try {
        // *Intento traer todas las categorias
        await getRepository(categoria)
            .find()
            .then(result => {
                res.json({
                    status: "OK",
                    categorias: result
                })
            })
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
 * *Crea una categoria 
 * @param req 
 * @param res 
 */
export async function crearCategoria(req: Request, res: Response): Promise<void> {


    try {
        const newCategoria = {
            nombre: req.body.nombre,
            imagen: req.file.filename,
            descripcion: req.body.descripcion
        };
        //* guarda los datos para crear una nueva categoria

        await getRepository(categoria)
            .save(newCategoria)
            .then(result => {
                res.json({
                    status: "OK",
                    msg: "Se creo la categoria correctamente.",
                    categoria: result
                })
            })
            .catch(err => {
                res.json({
                    error: err
                })
            })
    }
    catch (err) {
        // !retorna un error en caso de fallar
        console.error(err)
        res.status(404).json({
            error: err
        })
    }
}
/**
 * *Obtengo una categoria
 * @param req 
 * @param res 
 */
export async function getCategoria(req: Request, res: Response): Promise<void> {
    try {
        let id = await req.params.id
        await getRepository(categoria)
            .find({ where: { id: id } })
            .then(result => {
                res.json({ result: result })
            })
    }
    catch (error) {
        console.error(error)
        res.status(404).json({ error })
    }
}

/**
 * *Actualizar una categoria
 * @param req 
 * @param res 
 */
export async function updateCategoria(req: Request, res: Response): Promise<void> {

    try {
        let id = await req.params.id

        await getRepository(categoria)
            .createQueryBuilder("categoria")
            .update(req.body)
            .where("id = :id", { id: id })
            .execute()
            .then(result => {
                if (result.raw.affectedRows > 0 && result.raw.warningCount === 0) {
                    res.json({ "status": "OK", "msg": "Los cambios se guardaron correctamente" })
                }
                else {
                    res.json({ "status": "FAIL", "msg": "No se pudieron guardar los cambios correctamente, intent nuevamente." })
                }
            })
    }
    catch (error) {
        console.error(error)
        res.status(404).json({ error })
    }
}

export async function deleteCategoria(req: Request, res: Response): Promise<void> {
    try {
        let id = await req.params.id

        await getRepository(categoria)
            .createQueryBuilder("categoria")
            .delete()
            .where("id = :id", { id: id })
            .execute()
            .then(result => {
                if (result.raw.affectedRows > 0 && result.raw.warningCount === 0) {
                    res.json({ "status": "OK", "msg": "Los cambios se guardaron correctamente" })
                }
                else {
                    res.json({ "status": "FAIL", "msg": "No se pudieron guardar los cambios correctamente, intent nuevamente." })
                }
            })
    } catch (error) {
        console.error(error)
        res.status(404).json({ error })
    }
}