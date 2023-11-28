import { NextFunction, Request, Response } from "express";
import Interceptor from "./interceptor.middleware";
import HttpException from "../utils/exception";
import { logger } from "../utils/logger";

export default class ErrorMiddleWare extends Interceptor {

    constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next)
    }

    /**
     * The function handles HTTP errors by logging the error details and sending a response with the
     * error message and status code.
     * @param {HttpException} error - The `error` parameter is an instance of the `HttpException`
     * class, which represents an HTTP error. It contains information about the error, such as the
     * status code and message.
     * @param {Request} request - HTTP request object.
     * @param {Response} response - HTTP response object
     * @param {NextFunction} next - Express next middleware function
     */
    static async handleErrors(
        error: HttpException,
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const status: number = error.status || 500;
        const message: string = error.message || "Something went wrong";

        logger.error(
            `[Error Handler]: Path: ${request.path}, Method: ${request.method}, Status: ${status}, ${message}`
        );

        response.status(status).json({ message })
    }

}