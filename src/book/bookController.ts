import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    
    res.json({message:"testing book api"})
}

export {createBook}