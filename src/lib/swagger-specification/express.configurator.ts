import { Router, Request, Response, NextFunction } from "express";
import { ISwaggerExpressOptions, ISwaggerExpressOptionsSpecification } from "./i-swagger-express-options";
import { SwaggerService } from "./swagger.service";

export function express( options?: ISwaggerExpressOptions ): Router {
    let path: string = "/api-docs/swagger.json";
    if ( options ) {
        if ( options.path ) {
            path = options.path;
        }
        if ( options.specification ) {
            let specification: ISwaggerExpressOptionsSpecification = options.specification;
            if ( specification.basePath ) {
                SwaggerService.setBasePath( specification.basePath );
            }
            if ( specification.openapi ) {
                SwaggerService.setOpenapi( specification.openapi );
            }
            if ( specification.info ) {
                SwaggerService.setInfo( specification.info );
            }
        }
    }
    const router: Router = Router();
    router.get( path, ( request: Request, response: Response, next: NextFunction ) => {
        response.json( SwaggerService.getData() );
    } );
    return router;
}
