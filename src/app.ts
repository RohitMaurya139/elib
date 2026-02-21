import express, { type NextFunction, type Request, type Response } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandlers.ts';
import userRouter from './user/userRouter.ts';
import bookRouter from './book/bookRouter.ts';

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    
   
    res.json({ message: "hi, baby" })
    
})
app.use('/api/users',userRouter)
app.use('/api/books',bookRouter)

app.use(globalErrorHandler)



export default app