import express from 'express'
import { createUser, getUser } from './userController.ts'

const userRouter = express.Router()

userRouter.post('/register', createUser)
userRouter.post('/login', getUser)


export default userRouter