import { NextFunction, Request, Response } from "express";
import MainService from "../services/main.service";
import { StatusCodes } from "http-status-codes";
import Query from "../interfaces/query.interface";

export default class MainController {

    private mainService: MainService;

    constructor () {
        this.mainService = new MainService()
    }

    public search = async (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK).send(
            await this.mainService.search(request.query as unknown as Query)
        )
    }

    public getPhone = async (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK).send(
            await this.mainService.getPhone(Number(request.params.id))
        )
    }

}