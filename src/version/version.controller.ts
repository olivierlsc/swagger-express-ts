import * as express from "express";
import { injectable } from "inversify";
import { controller, httpGet, interfaces, httpPost } from "inversify-express-utils";
import { ApiPath, ApiOperationGet, ApiOperationPost } from "../lib/swagger-specification/index";
import "reflect-metadata";
const pkg = require( "../../package.json" );

@ApiPath( {
    path : "/version",
    name : "Version",
    description : "Everything about version"
} )
@controller( "/version" )
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = "VersionController";

    @ApiOperationGet( {
        description : "Version object that need to be  2222",
        summary : "Add a new Version"
    } )
    @httpGet( "/" )
    public getVersions( request: express.Request, response: express.Response, next: express.NextFunction ): void {
        response.json( {
            description : pkg.description,
            name : pkg.name,
            version : pkg.version,
        } );
    }

    @ApiOperationPost( {
        path: "/{idVersion}",
        description : "Post Version object that need to be  2222",
        summary : "Post Add a new Version"
    } )
    @httpPost( "/" )
    public postVersion( request: express.Request, response: express.Response, next: express.NextFunction ): void {

    }

    @ApiOperationGet( {
        path: "/{idVersion}",
        description : "Get Version object that need to be  2222",
        summary : "Get Add a new Version"
    } )
    @httpPost( "/" )
    public getVersion( request: express.Request, response: express.Response, next: express.NextFunction ): void {

    }
}
