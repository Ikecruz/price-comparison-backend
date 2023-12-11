import { Router } from "express";

/* The code is defining an interface called `Route` that has two properties: `path` and `router`. */
export interface Route {
    path?: string,
    router: Router
}