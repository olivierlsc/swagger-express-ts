import { Router, Request, Response, NextFunction } from "express";
import { SwaggerService } from "./swagger.service";
import { ISwaggerInfo, ISwaggerDefinition, ISwaggerDefinitionProperty } from "./i-swagger";
import * as assert from "assert";
import { SwaggerDefinitionConstant } from "./swagger-definition.constant";

export interface ISwaggerExpressOptionsDefinitionModelProperty {
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

export interface IswaggerExpressOptionsDefinitionModel {
    /**
     * Define all properties of model.
     */
    properties: {[key: string]: ISwaggerExpressOptionsDefinitionModelProperty};
}

export interface ISwaggerExpressOptionsDefinition {
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
    models?: {[key: string]: IswaggerExpressOptionsDefinitionModel};
}

export interface ISwaggerExpressOptions {
    /**
     * Path of resource.
     * Default is "/api-docs/swagger.json".
     */
    path?: string;

    /**
     * Swagger Definition.
     */
    definition?: ISwaggerExpressOptionsDefinition;
}

export function express( options?: ISwaggerExpressOptions ): Router {
    let path: string = "/api-docs/swagger.json";
    assert.ok( options, "Options are required." );
    assert.ok( options.definition, "Definition is required." );
    assert.ok( options.definition.info, "Informations are required. Base is { title: \"Title of my API\", version: \"1.0.0\"}" );
    if ( options.path ) {
        path = options.path;
    }

    let definition: ISwaggerExpressOptionsDefinition = options.definition;
    if ( definition.basePath ) {
        SwaggerService.setBasePath( definition.basePath );
    }
    if ( definition.openapi ) {
        SwaggerService.setOpenapi( definition.openapi );
    }
    if ( definition.info ) {
        SwaggerService.setInfo( definition.info );
    }
    if ( definition.schemes ) {
        SwaggerService.setSchemes( definition.schemes );
    }
    if ( definition.produces ) {
        SwaggerService.setProduces( definition.produces );
    }
    if ( definition.consumes ) {
        SwaggerService.setConsumes( definition.consumes );
    }
    if ( definition.host ) {
        SwaggerService.setHost( definition.host );
    }
    if ( definition.models ) {
        let definitions: {[key: string]: ISwaggerDefinition} = {};
        for ( let modelIndex in definition.models ) {
            let model: IswaggerExpressOptionsDefinitionModel = definition.models[ modelIndex ];
            let newDefinition: ISwaggerDefinition = {
                type : SwaggerDefinitionConstant.Definition.Type.OBJECT,
                properties : {},
                required : []
            };
            for ( let propertyIndex in model.properties ) {
                let property: ISwaggerExpressOptionsDefinitionModelProperty = model.properties[ propertyIndex ];
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
        SwaggerService.setDefinitions( definitions );
    }
    SwaggerService.buildSwagger();
    const router = buildRouter( path );
    return router;
}

function buildRouter( path: string ): Router {
    const router: Router = Router();
    router.get( path, ( request: Request, response: Response, next: NextFunction ) => {
        response.json( SwaggerService.getData() );
    } );
    return router;
}
