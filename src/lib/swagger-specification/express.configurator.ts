import { Router, Request, Response, NextFunction } from "express";
import { ISwaggerOptions } from "./i-swagger-options";
import { SwaggerService } from "./swagger.service";

export function express( path: string = "/api-docs/swagger", options?: ISwaggerOptions ): Router {
    const router: Router = Router();
    router.get( path, ( request: Request, response: Response, next: NextFunction ) => {
        response.json( SwaggerService.getData() );
    } );
    return router;
}
