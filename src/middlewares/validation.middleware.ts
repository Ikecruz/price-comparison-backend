import { NextFunction, Request, Response } from "express";
import Query from "../interfaces/query.interface";
import HttpException from "../utils/exception";
import { StatusCodes } from "http-status-codes";

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