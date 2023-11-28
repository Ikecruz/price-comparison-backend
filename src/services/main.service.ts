import { PrismaClient } from "@prisma/client";
import database from "../database";
import Query from "../interfaces/query.interface";
import HttpException from "../utils/exception";
import { StatusCodes } from "http-status-codes";

export default class MainService {

    private readonly ormService: PrismaClient;

    constructor () {
        this.ormService = database.getClient();
    }

    public async search (query: Query) {

        const phones = await this.ormService.phone.findMany({
            where: {
                model: {
                    name: {
                        contains: query.keyword
                    }
                }
            },
            include: {
                model: {
                    select: {
                        name: true
                    }
                }
            },
            take: query.limit
        })

        if (!phones) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                `No phone with keyword ${query.keyword} found`
            )
        }

        return phones;

    }

    public async getPhone (id: number) {

        const phone = await this.ormService.phone.findFirst({
            where: {
                id
            },
            include: {
                comparisons: {
                    select: {
                        name: true,
                        price: true,
                        url: true
                    }
                }
            }
        })

        if (!phone) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                "Phone not found"
            )
        }
 
        return phone;

    }

}