import {Router, Request, Response, NextFunction} from "express";
import {SwaggerService} from "./swagger.service";
import * as assert from "assert";
import {build, ISwaggerBuildDefinition} from "./swagger.builder";
import {ISwagger} from "./i-swagger";

export interface ISwaggerExpressOptions {
    /**
     * Path of resource.
     * Default is "/api-docs/swagger.json".
     */
    path?: string;

    /**
     * Swagger Definition.
     */
    definition?: ISwaggerBuildDefinition;

    /**
     * Api Version.
     * Default is "v1".
     */
    apiVersion?: string;
}

export function express(options?: ISwaggerExpressOptions): Router {
    let path: string = "/api-docs/swagger.json";
    let apiVersion: string = "v1";
    if (options) {
        assert.ok(options.definition, "Definition is required.");
        if (options.path) {
            path = options.path;
        }
        if (options.apiVersion) {
            apiVersion = options.apiVersion;
        }
        if (options.definition) {
            build(options.definition, apiVersion);
        }
    }
    const router = buildRouter(path, apiVersion);
    return router;
}

function buildRouter(path: string, version: string): Router {
    const router: Router = Router();
    router.get(
        path,
        (request: Request, response: Response, next: NextFunction) => {
            const data: ISwagger = SwaggerService.getInstance(version).getData();
            response.json(data);
        }
    );
    return router;
}
