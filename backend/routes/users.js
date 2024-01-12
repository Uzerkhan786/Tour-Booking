import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../Controllers/userController.js'

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

//Update user
router.put('/:id',updateUser)

//Delete user
router.delete('/:id',  deleteUser)

//Get single user
router.get('/:id',  getSingleUser)

//Get all user
router.get('/', getAllUser)


export default router