import cors from 'cors';
import "express-async-errors"
import express, { Application, Request } from "express";
import { PORT } from './config';
import { Route } from './interfaces/route.interface';
import morganMiddleware from './middlewares/morgan.middleware';
import { logger } from './utils/logger';
import ErrorMiddleWare from './middlewares/error.middleware';
import expressListRoutes from "express-list-routes"
import database from './database';

export default class App {

    public app: Application;
    public port: string | number;
    private database: typeof database;

    constructor(routes: Route[]) {
        this.app = express();
        this.port = PORT || 8000;
        this.database = database;
        this.initializeMiddlewares()
        this.initializeRoutes(routes)
        this.initializeErrorHandling()
        this.listRoutes()
        this.initializeDatabase()
    }

    /**
     * The `listen` function starts the server and logs a message indicating that the server is
     * running.
     */
    public listen(): void {
        this.app.listen(this.port, () => {
            logger.info(`📡 [server]: Server is running @ http://localhost:${this.port}`)
        })
    }

    /**
     * The function initializes and adds various middlewares to the Express app.
     */
    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cors<Request>());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morganMiddleware)
    }

    /**
     * The function initializes routes by adding them to the app with a base URL of "/api/v1".
     * @param {Route[]} routes - The `routes` parameter is an array of `Route` objects. Each `Route`
     * object represents a specific route in the application.
     */
    private initializeRoutes(routes: Route[]): void {
        routes.forEach(route => {
            this.app.use("/api/v1", route.router)
        })
    }  

    /**
     * The function initializes a database connection and logs the status of the connection.
     */
    private async initializeDatabase() {

        try {

            await this.database.connect()
            logger.info(`🛢️ [Database]: Database connected`)

        } catch (error) {
            logger.error(`🛢️ [Database]: Database connection failed`)
            console.log(error)
        }

    }

    /**
     * The function initializes error handling for the application.
     */
    private initializeErrorHandling() {
        this.app.use(ErrorMiddleWare.handleErrors)
    }

    /**
     * Lists all available routes in the Express app
     */
    private listRoutes() {
        expressListRoutes(
            this.app,
            {
                logger: ((method, space, path) => logger.info(`🚏 [Routes]: ${method}  ${path}`))
            }
        )
    }

}