# @ApiOperationPost(args: IApiOperationPostArgs)
Decorate method for create a resource in your controller.

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
}

```

# IApiOperationPostArgs

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
    @ApiOperationPost( {
        description : "Post version object",
        summary : "Post new version",
        parameters : {
            body : { description : "New version", required : true, model : "Version" }
        },
        responses : {
            200 : { description : "Success" },
            400 : { description : "Parameters fail" }
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