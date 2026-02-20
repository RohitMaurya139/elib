import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import type { HttpError } from "http-errors";
import { config } from "../config/config.ts";


// global error handler
const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err.message);

    res.status(500).json({
        success: false,
        message: err.message,
        errorStack: config.env === "development" ? err.stack : "",
    });
};

export default globalErrorHandler