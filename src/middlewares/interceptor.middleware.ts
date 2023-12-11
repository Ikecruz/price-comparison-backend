import { NextFunction, Request, Response } from "express";

/* The Interceptor class is a TypeScript class that stores the IP address of a request. */
export default class Interceptor {

    protected ip: string

    constructor (req: Request, res: Response, next: NextFunction) {
        this.ip = req.ip
    }

}