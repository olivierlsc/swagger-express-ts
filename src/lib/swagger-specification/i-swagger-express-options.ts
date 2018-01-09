import { ISwaggerInfo } from "./i-swagger";
export interface ISwaggerExpressOptionsSpecification {
    /**
     *  Base path. Default is "/".
     */
    basePath?: string;

    openapi?: string;

    info?: ISwaggerInfo;
}

export interface ISwaggerExpressOptions {
    /**
     * Path of resource. Default is "/api-docs/swagger".
     */
    path?: string;

    /**
     * Swagger specification.
     */
    specification?: ISwaggerExpressOptionsSpecification;
}