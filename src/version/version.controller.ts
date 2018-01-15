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
        summary : "Add a new Version",
        responses : {
            200 : { description : "Success", definition : "Version" }
        }
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
        description : "Post Version object that need to be  2222",
        summary : "Post Add a new Version",
        parameters : {
            body : { description : "New version", required : true, definition: "version" }
        },
        responses : {
            200 : { description : "Success" },
            400 : { description : "Parameters fail" }
        }
    } )
    @httpPost( "/" )
    public postVersion( request: express.Request, response: express.Response, next: express.NextFunction ): void {
        if ( ! request.body ) {
            return response.status( 400 ).end();
        }
        response.json( request.body );
    }
}
