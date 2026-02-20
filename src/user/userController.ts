import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Users from "./userModel.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.ts";
import type { User } from "./userTypes.ts";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    // 1. validation
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }
    // 2. process

    try {
        const user = await Users.findOne({ email });
          if (user) {
              const error = createHttpError(
                  400,
                  "User Already exist with this email",
              );
              return next(error);
          }
    } catch (error) {
        return next(createHttpError(500, "Error while getting user"))
    }
  

    const hashPassword = await bcrypt.hash(password, 10);

   let newUser:User
  try {
       newUser = await Users.create({
          name,
          email,
          password: hashPassword,
      });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user"));
  }

    // token generation
   try {
     const token = jwt.sign({ sub: newUser._id }, config.jwtSecret as string, {
         expiresIn: "7d",
     });

     // 3. response
     res.status(201).json({ accessToken: token });
   } catch (error) {
    return next(createHttpError(500, "Error while creating jwt token"));
   }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = createHttpError(400, "All field are required");
        return next(error);
    }
    const user = await Users.findOne({ email });
    if (!user) {
        const error = createHttpError(400, "Invalid credentials");
        return next(error);
    }
    // bcrypt.compare(plainPassword, hashedPassword) order is very important
    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
        const error = createHttpError(400, "Invalid credentials");
        return next(error);
    }
    const token = jwt.sign({ sub: user._id }, config.jwtSecret as string, {
        expiresIn: "7d",
    });

    // 3. response

    res.status(201).json({
        message: `welcome ${user.name}`,
        accessToken: token,
    });
}
export {createUser,getUser }