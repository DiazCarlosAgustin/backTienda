import { Router } from 'express'
import { getUsers, getUser, getUserLog, updateUser } from '../controllers/user.controller'
import { isLog } from "../controllers/authController";

const router = Router()
/*
    *Para poder hacer uso de esta ruta necesito que ul usuario este logueado
    TODO: hacer que para algunas rutoas como por ej getUsers() solo lo pueda hacer un admin 
*/

router.use(isLog)

router.route('/')
    .get(getUsers)
router.route("/main")
    .get(getUserLog)
router.route('/:id')
    .get(getUser)
    .put(updateUser)
export default router