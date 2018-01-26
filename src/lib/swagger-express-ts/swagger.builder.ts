import { ISwaggerInfo, ISwaggerDefinition, ISwaggerDefinitionProperty, ISwaggerExternalDocs } from "./i-swagger";
import * as assert from "assert";
import { SwaggerService } from "./swagger.service";
import { SwaggerDefinitionConstant } from "./swagger-definition.constant";

export interface ISwaggerBuildDefinitionModelProperty {
    /**
     * Define type of property. Example: SwaggerDefinitionConstant.Definition.Property.Type.STRING
     */
        type: string;

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
}

export interface ISwaggerBuildDefinitionModel {
    /**
     * Define all properties of model.
     */
    properties: {[key: string]: ISwaggerBuildDefinitionModelProperty};
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
    models?: {[key: string]: ISwaggerBuildDefinitionModel};

    /**
     * Define external doc
     * Optional.
     */
    externalDocs?: ISwaggerExternalDocs;
}

export function build( buildDefinition: ISwaggerBuildDefinition ): void {
    assert.ok( buildDefinition, "Definition are required." );
    assert.ok( buildDefinition.info, "Informations are required. Base is { title: \"Title of my API\", version: \"1.0.0\"}" );
    if ( buildDefinition.basePath ) {
        SwaggerService.getInstance().setBasePath( buildDefinition.basePath );
    }
    if ( buildDefinition.openapi ) {
        SwaggerService.getInstance().setOpenapi( buildDefinition.openapi );
    }
    if ( buildDefinition.info ) {
        SwaggerService.getInstance().setInfo( buildDefinition.info );
    }
    if ( buildDefinition.schemes ) {
        SwaggerService.getInstance().setSchemes( buildDefinition.schemes );
    }
    if ( buildDefinition.produces ) {
        SwaggerService.getInstance().setProduces( buildDefinition.produces );
    }
    if ( buildDefinition.consumes ) {
        SwaggerService.getInstance().setConsumes( buildDefinition.consumes );
    }
    if ( buildDefinition.host ) {
        SwaggerService.getInstance().setHost( buildDefinition.host );
    }
    if ( buildDefinition.externalDocs ) {
        SwaggerService.getInstance().setExternalDocs( buildDefinition.externalDocs );
    }
    if ( buildDefinition.models ) {
        let definitions: {[key: string]: ISwaggerDefinition} = {};
        for ( let modelIndex in buildDefinition.models ) {
            let model: ISwaggerBuildDefinitionModel = buildDefinition.models[ modelIndex ];
            let newDefinition: ISwaggerDefinition = {
                type : SwaggerDefinitionConstant.Definition.Type.OBJECT,
                properties : {},
                required : []
            };
            for ( let propertyIndex in model.properties ) {
                let property: ISwaggerBuildDefinitionModelProperty = model.properties[ propertyIndex ];
                let newProperty: ISwaggerDefinitionProperty = {
                    type : property.type
                };
                if ( property.format ) {
                    newProperty.format = property.format;
                }
                if ( property.required ) {
                    newDefinition.required.push( propertyIndex );
                }
                newDefinition.properties[ propertyIndex ] = newProperty;
            }
            definitions[ modelIndex ] = newDefinition;
        }
        SwaggerService.getInstance().setDefinitions( definitions );
    }
    SwaggerService.getInstance().buildSwagger();
}