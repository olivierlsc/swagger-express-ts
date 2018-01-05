import { Router, Request, Response, NextFunction } from "express";
import { ISwaggerExpressOptions } from "./i-swagger-express-options";
import { SwaggerService } from "./swagger.service";
import { ISwagger } from "./i-swagger";

function buildSwaggerFromSwaggerExpressOptions( options: ISwaggerExpressOptions ): ISwagger {
    let swaggerData: ISwagger = SwaggerService.getData();
    return swaggerData;
}

export function express( options?: ISwaggerExpressOptions ): Router {
    let path: string = "/api-docs/swagger";
    if ( options ) {
        if ( options.path ) {
            path = options.path;
        }
        let swaggerData = buildSwaggerFromSwaggerExpressOptions( options );
        SwaggerService.setData( swaggerData );
    }
    const router: Router = Router();
    router.get( path, ( request: Request, response: Response, next: NextFunction ) => {
        response.json( SwaggerService.getData() );
    } );
    return router;
}
