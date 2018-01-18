# @ApiOperationPut(args: IApiOperationPutArgs)
Decorate method for updating a resource in your controller.

Example:

```ts
import * as express from "express";
import { injectable } from "inversify";
import { controller, interfaces, requestParam, httpPut } from "inversify-express-utils";
import { ApiPath, ApiOperationPut, SwaggerDefinitionConstant } from "swagger-express-ts";
import "reflect-metadata";

@ApiPath( {
    path : "/versions",
    name : "Version"
} )
@controller( "/versions" )
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

    @ApiOperationPut( {
        path : "/{id}",
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
            200 : { model : "Version" }
        }
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

```

# IApiOperationPutArgs

## path: string
Define particular path of operation. Default is path parameter in @ApiPath.
- Optional

## description: string
Define description of operation.
- Optional

## summary: string
Define summary of operation.
- Optional

## parameters: [IApiOperationArgsBaseParameters](https://github.com/olivierlsc/swagger-express-ts/blob/master/wiki/i-api-operation-args-base-parameters.md)
Define parameters in path, body, query and formData.
- Required

## responses: {[key: string]: [IApiOperationArgsBaseResponse](https://github.com/olivierlsc/swagger-express-ts/blob/alpha/wiki/i-api-operation-args-base-response.md)}
Define all responses.
- Required

## produces: string[]
Define type list that resource produce.
- Optional
- Default is global type list defined in ISwaggerBuildDefinition when execute .express(options: ISwaggerExpressOptions)
