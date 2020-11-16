import {Router} from 'express'
import {getUsers, createUser, getUser} from '../controllers/user.controller'

const router = Router()

router.route('/')
    .get(getUsers)
router.route('/register')
    .post(createUser)
router.route('/:id')
    .get(getUser)
    
export default router