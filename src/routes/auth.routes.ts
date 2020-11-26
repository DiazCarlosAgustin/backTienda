import {Router} from 'express'
import {login} from "../controllers/authController";
import {createUser} from '../controllers/user.controller'

const router = Router()
router.route("/login")
    .post(login)

router.route('/register')
    .post(createUser)
export default router