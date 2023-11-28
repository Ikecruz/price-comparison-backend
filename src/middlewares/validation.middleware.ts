import { NextFunction, Request, Response } from "express";
import Query from "../interfaces/query.interface";
import HttpException from "../utils/exception";
import { StatusCodes } from "http-status-codes";

/**
 * The `validate` function checks if the request query is valid and throws an exception if it is not.
 * @param {Request} request - HTTP request object.
 * @param {Response} response - HTTP response object
 * @param {NextFunction} next - Express next middleware function
 */
export const validate = (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {

    if (!(request.query instanceof Query)) {
        throw new HttpException(
            StatusCodes.BAD_REQUEST,
            "Invalid query data"
        )
    }

    if (request.query.keyword!.length as number < 1) {
        throw new HttpException(
            StatusCodes.BAD_REQUEST,
            "Invalid query data"
        )
    }

    next()

}