import { Router, Request, Response, NextFunction } from "express";
import { SwaggerService } from "./swagger.service";
import { ISwaggerInfo } from "./i-swagger";

export interface ISwaggerExpressOptionsDefinition {
    /**
     * Base URL for all API.
     * Optional. Default is "/".
     */
    basePath?: string;

    /**
     * Version Open API
     * Optional.
     */
    openapi?: string;

    /**
     * Metadata
     */
    info: ISwaggerInfo;

    /**
     * Define the MIME types supported by the API for consumes. The root-level definition can be overridden in individual operations.
     * Optional. Default is SwaggerDefinition.Consume.JSON = "application/json".
     */
    consumes?: string[];

    /**
     * Define the MIME types supported by the API for produces. The root-level definition can be overridden in individual operations.
     * Optional. Default is SwaggerDefinition.Produce.JSON = "application/json".
     */
    produces?: string[];

    /**
     * Define schemes.
     * Optional. Default is SwaggerDefinition.Scheme.HTTP = "http".
     */
    schemes?: string[];
}

export interface ISwaggerExpressOptions {
    /**
     * Path of resource.
     * Default is "/api-docs/swagger.json".
     */
    path?: string;

    /**
     * Swagger Definition.
     */
    definition?: ISwaggerExpressOptionsDefinition;
}

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
            if ( definition.consumes ) {
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
