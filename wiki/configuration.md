# Configuration

## .express(options: ISwaggerExpressOptions)
Example with default configuration:

```ts
app.use( swagger.express({
    definition : {
        info : {
            title : "My api" ,
            version : "1.0"
        } ,
        models : {
            Version : {
                properties : {
                    id : {
                        type : SwaggerDefinitionConstant.Model.Property.Type.STRING ,
                        required : true
                    } ,
                    name : {
                        type : SwaggerDefinitionConstant.Model.Property.Type.STRING ,
                        required : true
                    } ,
                    description : {
                        type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                    } ,
                    version : {
                        type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                    }
                }
            }
        } ,
        externalDocs : {
            url : "My url"
        }
    }
}) );
```

# ISwaggerExpressOptions

## path: string
Define path to serve swagger.json
- Optional. 
- Default is "/api-docs/swagger.json".

## definition: [ISwaggerBuildDefinition](./i-swagger-build-definition.md)
Define swagger definition.
- Required

# Authentication

## Configuration

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

## Secure controller

Example:

```ts
...
@ApiPath( {
    path : "/version",
    name : "Version",
    security : {
        basicAuth : []
    }
} )
...
@ApiOperationGet( {
    ...
    security : {
        basicAuth : []
    }
} )
...
```
