import { ISwaggerInfo } from "./i-swagger";
export interface ISwaggerExpressOptionsDefinition {
    /**
     *  Base path. Default is "/".
     */
    basePath?: string;

    openapi?: string;

    info?: ISwaggerInfo;

    consumes?: string[];

    produces?: string[];

    schemes?: string[];
}

export interface ISwaggerExpressOptions {
    /**
     * Path of resource. Default is "/api-docs/swagger".
     */
    path?: string;

    /**
     * Swagger specification.
     */
    definition?: ISwaggerExpressOptionsDefinition;
}