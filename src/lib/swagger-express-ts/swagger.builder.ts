import {
  ISwaggerInfo,
  ISwaggerDefinition,
  ISwaggerDefinitionProperty,
  ISwaggerExternalDocs,
  ISwaggerOperationResponse
} from "./i-swagger";
import * as assert from "assert";
import { SwaggerService } from "./swagger.service";
import { SwaggerDefinitionConstant } from "./swagger-definition.constant";
import {
  IApiOperationArgsBaseParameter,
  IApiOperationArgsBaseResponse
} from "./i-api-operation-args.base";

export interface ISwaggerBuildDefinitionModelPropertyType {
  type?: string | ISwaggerBuildDefinitionModelPropertyType;
}

export interface ISwaggerBuildDefinitionModelProperty {
  /**
   * Define type of property. Example: SwaggerDefinitionConstant.Definition.Property.Type.STRING
   * Optional.
   */
  type?: string;

  /**
   * Define format of property. Example: SwaggerDefinitionConstant.Definition.Property.Format.INT_64
   * Optional.
   */
  format?: string;

  /**
   * Define if property is required.
   * Optional. Default is false.
   */
  required?: boolean;

  /**
   * Define model.
   * Optional.
   */
  model?: string;

  /**
   * Define enum;
   * Optional.
   */
  enum?: string[];

  /**
   * Define description.
   * Optional.
   */
  description?: string;

  /**
   * Define type of item. Example: SwaggerDefinitionConstant.Definition.Property.Type.STRING
   * Optional.
   */
  itemType?: string;
}

export interface ISwaggerBuildDefinitionModel {
  /**
   * Define description.
   */
  description?: string;

  /**
   * Define all properties of model.
   */
  properties: { [key: string]: ISwaggerBuildDefinitionModelProperty };
}

export interface ISwaggerSecurityDefinition {
  /**
   * Define type of security.
   */
  type: string;

  /**
   * Define where security set.
   * Optional.
   */
  in?: string;

  /**
   * Define name of security.
   * Optional.
   */
  name?: string;
}

export interface ISwaggerBuildDefinition {
  /**
   * Base URL for all API.
   * Optional. Default is "/".
   */
  basePath?: string;

  /**
   * Version Open API
   * Optional.
   */
  openapi?: string;

  /**
   * Metadata.
   */
  info: ISwaggerInfo;

  /**
   * Define the MIME types supported by the API for consumes. The root-level definition can be overridden in individual operations.
   * Optional. Default is SwaggerDefinition.Consume.JSON = "application/json".
   */
  consumes?: string[];

  /**
   * Define the MIME types supported by the API for produces. The root-level definition can be overridden in individual operations.
   * Optional. Default is SwaggerDefinition.Produce.JSON = "application/json".
   */
  produces?: string[];

  /**
   * Define schemes.
   * Optional. Default is SwaggerDefinition.Scheme.HTTP = "http".
   */
  schemes?: string[];

  /**
   * Define host.
   * Optional.
   */
  host?: string;

  /**
   * Define All Definitions.
   * Optional.
   */
  models?: { [key: string]: ISwaggerBuildDefinitionModel };

  /**
   * Define external doc
   * Optional.
   */
  externalDocs?: ISwaggerExternalDocs;

  /**
   * Define security definitions list.
   * Optional.
   */
  securityDefinitions?: { [key: string]: ISwaggerSecurityDefinition };

  /**
   * Define global responses.
   * Optional.
   */
  responses?: { [key: string]: IApiOperationArgsBaseResponse };
}

export function build(buildDefinition: ISwaggerBuildDefinition, apiVersion: string = "v1"): void {
    assert.ok(buildDefinition, "Definition are required.");
  assert.ok(
    buildDefinition.info,
    'Informations are required. Base is { title: "Title of my API", version: "1.0.0"}'
  );
  if (buildDefinition.basePath) {
    SwaggerService.getInstance(apiVersion).setBasePath(buildDefinition.basePath);
  }
  if (buildDefinition.openapi) {
    SwaggerService.getInstance(apiVersion).setOpenapi(buildDefinition.openapi);
  }
  if (buildDefinition.info) {
    SwaggerService.getInstance(apiVersion).setInfo(buildDefinition.info);
  }
  if (buildDefinition.schemes) {
    SwaggerService.getInstance(apiVersion).setSchemes(buildDefinition.schemes);
  }
  if (buildDefinition.produces) {
    SwaggerService.getInstance(apiVersion).setProduces(buildDefinition.produces);
  }
  if (buildDefinition.consumes) {
    SwaggerService.getInstance(apiVersion).setConsumes(buildDefinition.consumes);
  }
  if (buildDefinition.host) {
    SwaggerService.getInstance(apiVersion).setHost(buildDefinition.host);
  }
  if (buildDefinition.externalDocs) {
    SwaggerService.getInstance(apiVersion).setExternalDocs(buildDefinition.externalDocs);
  }
  if (buildDefinition.securityDefinitions) {
    SwaggerService.getInstance(apiVersion).addSecurityDefinitions(
      buildDefinition.securityDefinitions
    );
  }
  if (buildDefinition.models) {
    SwaggerService.getInstance(apiVersion).setDefinitions(buildDefinition.models);
  }
  if (buildDefinition.responses) {
    SwaggerService.getInstance(apiVersion).setGlobalResponses(buildDefinition.responses);
  }
  SwaggerService.getInstance(apiVersion).buildSwagger();
}
