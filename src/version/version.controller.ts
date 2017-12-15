import * as express from "express";
import { injectable } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { ApiPath, ApiGet } from "../lib/swagger-specification";
const pkg = require( "../../package.json" );

@ApiPath( "/" )
@controller( "/" )
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = "VersionController";

    @ApiGet({
        description: "Version object that need to be added",
        summary: "Add a new Version"
    })
    @httpGet( "/" )
    public get( request: express.Request, response: express.Response, next: express.NextFunction ): void {
        response.json( {
            description : pkg.description,
            name : pkg.name,
            version : pkg.version,
        } );
    }
}
