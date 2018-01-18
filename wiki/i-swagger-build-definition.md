
# ISwaggerBuildDefinition

## basePath: string
Define base URL for all API.
- Optional. 
- Default is "/"

## openapi: string
Define version of OpenAPI.
- Optional.

## info : [SwaggerInfo](https://github.com/olivierlsc/swagger-express-ts/blob/master/wiki/i-swagger-info.md)
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

## models: {[key: string]: [ISwaggerBuildDefinitionModel](https://github.com/olivierlsc/swagger-express-ts/blob/master/wiki/i-swagger-build-definition-model.md)}
Define all model.
- Required
