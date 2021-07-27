import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 } from 'uuid'
import { crearCategoria, getCategorias, getCategoria, updateCategoria, deleteCategoria } from '../controllers/categoria.controller'

const router = Router()
/**
 * *Rutas para categorias
 */
var storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/img/categoria"),
    filename: function (req, file, cb) {
        cb(null, v4() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage
})
router.route('/')
    .get(getCategorias)
    .post(upload.single("file"), crearCategoria)

router.route('/:id')
    .get(getCategoria)
    .put(updateCategoria)
    .delete(deleteCategoria)

export default router