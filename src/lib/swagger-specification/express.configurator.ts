import { Router, Request, Response, NextFunction } from "express";
import { ISwaggerExpressOptions, ISwaggerExpressOptionsDefinition } from "./i-swagger-express-options";
import { SwaggerService } from "./swagger.service";

export function express( options?: ISwaggerExpressOptions ): Router {
    let path: string = "/api-docs/swagger.json";
    if ( options ) {
        if ( options.path ) {
            path = options.path;
        }
        if ( options.definition ) {
            let definition: ISwaggerExpressOptionsDefinition = options.definition;
            if ( definition.basePath ) {
                SwaggerService.setBasePath( definition.basePath );
            }
            if ( definition.openapi ) {
                SwaggerService.setOpenapi( definition.openapi );
            }
            if ( definition.info ) {
                SwaggerService.setInfo( definition.info );
            }
            if ( definition.schemes ) {
                SwaggerService.setSchemes( definition.schemes );
            }
            if ( definition.produces ) {
                SwaggerService.setProduces( definition.produces );
            }
            if ( definition.consumes) {
                SwaggerService.setConsumes( definition.consumes );
            }
        }
    }
    SwaggerService.buildSwagger();
    const router: Router = Router();
    router.get( path, ( request: Request, response: Response, next: NextFunction ) => {
        response.json( SwaggerService.getData() );
    } );
    return router;
}
