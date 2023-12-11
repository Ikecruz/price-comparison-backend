import { PrismaClient } from "@prisma/client";
import database from "../database";
import Query from "../interfaces/query.interface";
import HttpException from "../utils/exception";
import { StatusCodes } from "http-status-codes";

export default class MainService {

    private readonly ormService: PrismaClient;

    /**
     * The constructor initializes the ormService property with a client from the database.
     */
    constructor () {
        this.ormService = database.getClient();
    }

    /**
     * The function performs a search for phones based on a given query and returns the results along
     * with pagination information.
     * @param {Query} query - The `query` parameter is an object that contains the following
     * properties: keyword, page
     * @returns an object with the following properties:
     * - data: an array of phone objects that match the search query
     * - prev: the previous page number, or null if there is no previous page
     * - next: the next page number, or null if there is no next page
     */
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
                },
                comparisons: {
                    select: {
                        name: true,
                        price: true,
                        url: true
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

   /**
    * The function `getPhone` retrieves a phone object from the database based on the provided id and
    * includes additional information about the phone's model and comparisons, and throws an exception
    * if the phone is not found.
    * @param {number} id - The `id` parameter is a number that represents the unique identifier of a
    * phone. It is used to query the database and retrieve the phone with the matching id.
    * @returns the phone object that matches the given id.
    */
    public async getPhone (id: number) {

        const phone = await this.ormService.phone.findFirst({
            where: {
                id
            },
            include: {
                model: {
                    select: {
                        name: true
                    }
                },
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