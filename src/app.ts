import express, { type NextFunction, type Request, type Response } from 'express'
import type { HttpError } from 'http-errors';
import { config } from './config/config.ts';
import createHttpError from 'http-errors';
import globalErrorHandler from './middlewares/globalErrorHandlers.ts';

const app = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    
   
    res.json({ message: "hi, baby" })
    
})

app.use(globalErrorHandler)



export default app