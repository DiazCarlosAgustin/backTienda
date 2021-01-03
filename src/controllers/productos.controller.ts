import { Request, Response } from "express";
import { Producto } from "../entity/productos";
import { getRepository } from "typeorm";


/**
 * *Retorno todos los productos
 * @param req Request
 * @param res Response
 * 
 */
export async function getProductos(req: Request, res: Response): Promise<void> {
    try {
        await getRepository(Producto)
            .find()
            .then(result => {
                res.json({
                    status: "OK",
                    productos: result
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
    catch (err) {
        // !en caso que falle retorna el error
        console.error(err)
        res.status(404).json({
            "error": err
        })
    }
}

/**
 * *creo un producto
 * @param req 
 * @param res 
 */
export async function crearProducto(req: Request, res: Response): Promise<void> {
    try {
        const newProduct = req.body //*obtengo los paremetros
        await getRepository(Producto)
            .save(newProduct)
            .then(result => {
                res.json({
                    status: "OK",
                    mgs: "Se creo el producto correctament.",
                    producto: result
                })
            })
            .catch(err => {
                res.json({
                    status: "Fail",
                    msg: "No se registro correctamente, intente nuevamente",
                    err: err,
                    producto: newProduct
                });
            })
    }
    catch (err) {
        // !en caso que falle retorna el error
        console.error(err)
        res.status(404).json({
            "error": err
        })
    }
}

/**
 * *Obtengo 1 producto
 * @param req 
 * @param res 
 */
export async function getProducto(req: Request, res: Response): Promise<void> {
    try {
        const id = await req.params.id;

        await getRepository(Producto)
            .find({ where: { id: id } })
            .then(result => {
                res.json({ result: result })
            })
    }
    catch (err) {
        // !en caso que falle retorna el error
        console.error(err)
        res.status(404).json({
            "error": err
        })
    }
}

/**
 * TODO: crear la funcion de actualizar
 */
/**
 * TODO: crear la funcion de delete
 */