# Configuration

## .express(options: ISwaggerExpressOptions)
Example with default configuration:

```ts
app.use( swagger.express(
    {
        definition : {
            info : {
                title : "My api",
                version : "1.0"
            },
            models : {
                Version : {
                    properties : {
                        id : {
                            type : SwaggerDefinitionConstant.Definition.Property.Type.STRING,
                            required : true
                        },
                        name : {
                            type : SwaggerDefinitionConstant.Definition.Property.Type.STRING,
                            required : true
                        },
                        description : {
                            type : SwaggerDefinitionConstant.Definition.Property.Type.STRING
                        },
                        version : {
                            type : SwaggerDefinitionConstant.Definition.Property.Type.STRING
                        }
                    }
                }
            }
        }
    }
) );
```

# ISwaggerExpressOptions

## path: string
Define path to serve swagger.json
- Optional. 
- Default is "/api-docs/swagger.json".

## definition: ISwaggerBuildDefinition
Define swagger definition.
- Required

# ISwaggerBuildDefinition

## basePath: string
Define base URL for all API.
- Optional. 
- Default is "/"

## openapi: string
Define version of OpenAPI.
- Optional.

## info : ISwaggerInfo
Define info.

## consumes: string[]
Define the MIME types supported by the API for consumes. The root-level definition can be overridden in individual operations.
- Optional
- Default is SwaggerDefinition.Consume.JSON or "application/json".

## produces: string[]
Define the MIME types supported by the API for produces. The root-level definition can be overridden in individual operations.
- Optional
- Default is SwaggerDefinition.Consume.JSON or "application/json".

## schemes: string[]
Define Schemes.
- Optional
- Default is SwaggerDefinition.Scheme.HTTP = "http"

## host: string
Define host.
- Optional

## models: {[key: string]: ISwaggerBuildDefinitionModel}
Define all model.
- Required

# ISwaggerInfo

## title: string
Define title of your API
- Required

## description: string
Define description of your API
- Optional

## termsOfService: string
- Optional

## contact: ISwaggerContact
- Optional

## license: ISwaggerLicense
- Optional

## version: string
- Required

# ISwaggerBuildDefinitionModel

## properties: {[key: string]: ISwaggerBuildDefinitionModelProperty}
Define properties of model.
- Required

# ISwaggerBuildDefinitionModelProperty

## type: string
Define type of property.
- Required
- Example : SwaggerDefinitionConstant.Definition.Property.Type.STRING or "string"

## format: string
Define format of property.
- Optional
- Example : SwaggerDefinitionConstant.Definition.Property.Format.INT_64

## required: boolean
Define if property is required.
- Optionnal
- Default is false.

# ISwaggerContact

## name: string
Define name of contact.
- Optional

## url: string
Define url of contact.
- Optional

## email: string
Define email of contact.
- Optional

# ISwaggerLicense

## name: string
Define name of license.
- Required

## url: string
Define URL of license.
- Optional
