import * as express from "express";
import { injectable } from "inversify";
import { controller, httpGet, interfaces, httpPost, requestParam, httpPut } from "inversify-express-utils";
import { ApiPath, ApiOperationGet, ApiOperationPost } from "../lib/swagger-specification/index";
import "reflect-metadata";
import { SwaggerDefinitionConstant } from "../lib/swagger-specification/swagger-definition.constant";
import { ApiOperationPut } from "../lib/swagger-specification/api-operation-put.decorator";
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
    private data: [any] = [
        {
            id : "1",
            name : "Version 1",
            description : "Description Version 1",
            version : "1.0.0"
        },
        {
            id : "2",
            name : "Version 2",
            description : "Description Version 2",
            version : "2.0.0"
        }
    ];

    @ApiOperationGet( {
        description : "Get version object",
        summary : "Get version",
        responses : {
            200 : { description : "Success", isArray : true, model : "Version" }
        }
    } )
    @httpGet( "/" )
    public getVersions( request: express.Request, response: express.Response, next: express.NextFunction ): void {
        response.json( this.data );
    }

    @ApiOperationPost( {
        description : "Post version object",
        summary : "Post new version",
        parameters : {
            body : { description : "New version", required : true, model : "Version" }
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
        this.data.push( request.body );
        response.json( request.body );
    }

    @ApiOperationGet( {
        path : "/{id}",
        description : "Get version by id",
        summary : "Get version detail",
        parameters : {
            path : {
                id : {
                    description : "Id of version",
                    type : SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required : true
                }
            }
        },
        responses : {
            200 : { description : "Success", model : "Version" },
            404 : { description : "Version not exist" }
        },
        produces : [ SwaggerDefinitionConstant.Produce.JSON ]
    } )
    @httpGet( "/:id" )
    public getVersion( @requestParam( "id" ) id: string, request: express.Request, response: express.Response, next: express.NextFunction ): void {
        this.data.forEach( ( version: any )=> {
            if ( version.id === id ) {
                return response.json( version );
            }
        } );
        response.status( 404 ).end();
    }

    @ApiOperationPut( {
        path : "/{id}",
        description : "Put version by id",
        summary : "Put version",
        parameters : {
            path : {
                id : {
                    description : "Id of version",
                    type : SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required : true
                }
            },
            body : {
                description : "Updated version",
                model : "Version",
                required : true
            }
        },
        responses : {
            200 : { description : "Success", model : "Version" },
            400 : { description : "Parameters fail" },
            404 : { description : "Version not exist" }
        },
        produces : [ SwaggerDefinitionConstant.Produce.JSON ]
    } )
    @httpPut( "/:id" )
    public putVersion( @requestParam( "id" ) id: string, request: express.Request, response: express.Response, next: express.NextFunction ): void {
        if ( ! request.body ) {
            return response.status( 400 ).end();
        }
        this.data.forEach( ( version: any, index: number )=> {
            if ( version.id === id ) {
                let newVersion = request.body;
                version.id = newVersion.id;
                version.name = newVersion.name;
                version.description = newVersion.description;
                version.version = newVersion.version;
                this.data[ index ] = version;
                return response.json( version );
            }
        } );
        response.status( 404 ).end();
    }
}
