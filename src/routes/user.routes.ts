import {Router} from 'express'
import {getUsers, getUser, getUserLog} from '../controllers/user.controller'
import {isLog} from "../controllers/authController";

const router = Router()
router.use(isLog)

router.route('/')
    .get(getUsers)
router.route("/main")
    .get(getUserLog)
router.route('/:id')
    .get(getUser)
    
export default router