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

        const PAGE_LIMIT = 10;

        const CURRENT_PAGE = Number(query.page) || 1;

        const DATA_COUNT = await this.ormService.phone.count({
            where: {
                model: {
                    name: {
                        contains: query.keyword
                    }
                }
            }
        })

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
            skip: query.page ? PAGE_LIMIT * (query.page - 1) : undefined,
            take: PAGE_LIMIT,
        })

        if (!phones) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                `No phone with keyword ${query.keyword} found`
            )
        }

        return {
            data: phones,
            prev: CURRENT_PAGE > 1 ? CURRENT_PAGE - 1 : null,
            next: Math.round(DATA_COUNT / PAGE_LIMIT) > CURRENT_PAGE ? CURRENT_PAGE + 1 : null
        };

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