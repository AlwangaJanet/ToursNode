import { Router } from 'express'
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/authControllers'
import { verifyToken, isAdmin } from '../middlewares/authMiddle'

const userRouter = Router()

userRouter.get('/', verifyToken, isAdmin, getUsers)
userRouter.get('/:id', verifyToken, getUser)
userRouter.put('/:id', verifyToken, updateUser)
userRouter.delete('/:id', verifyToken, isAdmin, deleteUser)

export default userRouter