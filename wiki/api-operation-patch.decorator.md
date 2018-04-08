# @ApiOperationPatch(args: IApiOperationPatchArgs)
Decorate method for updating a field of resource in your controller.

Example:

```ts
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

    @ApiOperationPatch( {
         path : "/{id}/description",
        description : "Patch description in version object",
        summary : "Patch description in version",
        parameters : {
            path: {
                id: {
                    description : "Id of version",
                    type : SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required : true
                }
            },
            body : { description : "New version", required : true, model : "Version" }
        },
        responses : {
            200 : { description : "Success" },
            400 : { description : "Parameters fail" },
            404 : { description : "Version not found" }
        }
    } )
    @httpPatch( "/:id/description" )
    public patchVersionDescription( @requestParam( "id" ) id: string, request: express.Request, response: express.Response, next: express.NextFunction ): void {
        if ( ! request.body ) {
            return response.status( 400 ).end();
        }
        this.data.forEach( ( version: any )=> {
            if ( version.id === id ) {
                version.description = request.body.description;
                return response.json( version );
            }
        } );
        response.status( 404 ).end();
    }
}

```

# IApiOperationPatchArgs

## path: string
Define particular path of operation. Default is path parameter in [@ApiPath](./api-path.decorator.md).
- Optional

## description: string
Define description of operation.
- Optional

## summary: string
Define summary of operation.
- Optional

## parameters: [IApiOperationArgsBaseParameters](./i-api-operation-args-base-parameters.md)
Define parameters in path, body, query and formData.
- Required

## responses: {[key: string]: [IApiOperationArgsBaseResponse](./i-api-operation-args-base-response.md)}
Define all responses.
- Required

## produces: string[]
Define type list that resource produce.
- Optional
- Default is global type list defined in ISwaggerBuildDefinition when execute [.express(options: ISwaggerExpressOptions)](./configuration.md)

## security: {[key: string]: any[]}
Define security
- Optional

Example:

```ts
    ...
    @ApiOperationPatch( {
         path : "/{id}/description",
        description : "Patch description in version object",
        summary : "Patch description in version",
        parameters : {
            path: {
                id: {
                    description : "Id of version",
                    type : SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required : true
                }
            },
            body : { description : "New version", required : true, model : "Version" }
        },
        responses : {
            200 : { description : "Success" },
            400 : { description : "Parameters fail" },
            404 : { description : "Version not found" }
        },
        security : {
            basicAuth : []
        }
    } )
    ...
}

```

### Configuration

Example:

```ts
    app.use( swagger.express(
        {
            definition : {
                ...
                securityDefinitions : {
                    basicAuth : {
                        type : SwaggerDefinitionConstant.Security.Type.BASIC_AUTHENTICATION
                    },
                    apiKeyHeader : {
                        type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                        in: SwaggerDefinitionConstant.Security.In.HEADER,
                        name: "apiHeader"
                    }
                }
            }
        }
    ) );
```

## deprecated: boolean
Define deprecated
- Optional