import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Users from "./userModel.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.ts";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    // 1. validation
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }
    // 2. process

    const user = await Users.findOne({ email });
    if (user) {
        const error = createHttpError(
            400,
            "User Already exist with this email",
        );
        return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
        name,
        email,
        password: hashPassword,
    });

    // token generation
    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret as string,{expiresIn:'7d'});

    // 3. response
    res.json({ accessToken:token });
}


export {createUser }