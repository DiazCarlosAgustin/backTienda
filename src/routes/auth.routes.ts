import { Router } from 'express'
import { login } from "../controllers/authController";
import { crearUser } from '../controllers/user.controller'

const router = Router()
//* Rutas para acceder.

router.route("/login")
    .post(login)

router.route('/register')
    .post(crearUser)
export default router