import { NextFunction, Request, Response } from "express";
import MainService from "../services/main.service";
import { StatusCodes } from "http-status-codes";
import Query from "../interfaces/query.interface";

/* The MainController class handles search and retrieval of phone data. */
export default class MainController {

    private mainService: MainService;

    constructor () {
        this.mainService = new MainService()
    }

    /* The `search` method is an asynchronous function that handles a request to perform a search. It
    takes in three parameters: `request`, `response`, and `next`. */
    public search = async (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK).send(
            await this.mainService.search(request.query as unknown as Query)
        )
    }

    /* The `getPhone` method is an asynchronous function that handles a request to retrieve a phone
    based on its ID. */
    public getPhone = async (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK).send(
            await this.mainService.getPhone(Number(request.params.id))
        )
    }

}