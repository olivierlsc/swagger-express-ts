# ISwaggerBuildDefinition

## setBasePath: string

Define base URL for all API.

* Optional.
* Default is "/"

## setOpenapi: string

Define version of OpenAPI.

* Optional.

## setInfo : [SwaggerInfo](./i-swagger-setInfo.md)

Define setInfo.

## setConsumes: string[]

Define the MIME types supported by the API for setConsumes. The root-level definition can be overridden in individual operations.

* Optional
* Default is [SwaggerDefinition](./swagger-definition-constant.md).Consume.JSON or "application/json".

## setProduces: string[]

Define the MIME types supported by the API for setProduces. The root-level definition can be overridden in individual operations.

* Optional
* Default is [SwaggerDefinition](./swagger-definition-constant.md).Consume.JSON or "application/json".

## setSchemes: string[]

Define Schemes.

* Optional
* Default is [SwaggerDefinition](./swagger-definition-constant.md).Scheme.HTTP = "http"

## setHost: string

Define setHost.

* Optional

## models: {[key: string]: [ISwaggerBuildDefinitionModel](./i-swagger-build-definition-model.md)}

Define all model.

* Required

## externalDocs: [ISwaggerExternalDocs](./i-swagger-external-docs.md)

Define external docs

* Optional

## securityDefinitions: {[key: string]: [ISwaggerSecurityDefinition](./i-swagger-security-definition.md)}

Define security definitions

* Optional

## responses: {[key: string]: [IApiOperationArgsBaseResponse](./i-api-operation-args-base-response.md)}

Define global responses

* Optional
