import { Router } from "express";
import { Route } from "../interfaces/route.interface";
import MainController from "../controllers/main.controller";
import { validate } from "../middlewares/validation.middleware";

/* The MainRoute class sets up and initializes routes for a web application, including a search route
and a route to get phone details. */
class MainRoute implements Route {
    public path: string = ""
    public router: Router;
    public controller: MainController;

    constructor() {
        this.router = Router();
        this.controller = new MainController();
        this.initializeRoutes()
    }

    private initializeRoutes() {

        this.router.get(
            "/search", 
            validate,
            this.controller.search
        )

        this.router.get(
            "/phone/:id", 
            this.controller.getPhone
        )
    }


}

export default MainRoute