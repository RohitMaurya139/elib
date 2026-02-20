import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Users from "./userModel.ts";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    // 1. validation
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
    return next(error)
}
    // 2. process

    const user = await Users.findOne({ email })
    if (user) {
         const error = createHttpError(400, "User Already exist with this email");
         return next(error);
    }
    // 3. response

    res.json({message:"calling register api from userController"})
}


export {createUser }