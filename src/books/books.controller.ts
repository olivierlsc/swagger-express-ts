import {injectable} from "inversify";
import {controller, httpGet} from "inversify-express-utils";
import * as express from "express";
import { ApiPath, ApiGet } from "../lib/swagger-specification";

@ApiPath({
    path: "/books",
    name : "Book",
    description : "Everything about book"
})
@controller( "/books" )
@injectable()
export class BooksController {
    public static TARGET_NAME: string = "BooksController";

    constructor(){

    }

    @ApiGet({
        description : "Book object that need to be",
        summary : "Add a new Book"
    })
    @httpGet("/")
    public get(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.json([
            {
                id: 1,
                name: "My book 1"
            },
            {
                id: 2,
                name: "My book 2"
            }
        ]);
    }
}