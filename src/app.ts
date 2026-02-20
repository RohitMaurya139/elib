import express, { type NextFunction, type Request, type Response } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandlers.ts';
import userRouter from './user/userRouter.ts';

const app = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    
   
    res.json({ message: "hi, baby" })
    
})
app.use('/api/users',userRouter)

app.use(globalErrorHandler)



export default app