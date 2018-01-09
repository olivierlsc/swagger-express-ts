import * as express from "express";
import { injectable } from "inversify";
import { controller, httpGet, interfaces, httpPost } from "inversify-express-utils";
import { ApiPath, ApiGet, ApiPost } from "../lib/swagger-specification/index";
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

    @ApiGet( {
        description : "Version object that need to be  2222",
        summary : "Add a new Version"
    } )
    @httpGet( "/" )
    public get( request: express.Request, response: express.Response, next: express.NextFunction ): void {
        response.json( {
            description : pkg.description,
            name : pkg.name,
            version : pkg.version,
        } );
    }

    @ApiPost( {
        path: "/toto",
        description : "Post Version object that need to be  2222",
        summary : "Post Add a new Version"
    } )
    @httpPost( "/" )
    public post( request: express.Request, response: express.Response, next: express.NextFunction ): void {

    }
}
