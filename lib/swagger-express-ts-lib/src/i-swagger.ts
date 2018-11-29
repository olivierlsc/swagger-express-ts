import { ISwaggerSecurityDefinition } from './swagger.builder';
export interface ISwaggerLicense {
    name: string;
    url?: string;
}

export interface ISwaggerContact {
    name?: string;
    url?: string;
    email?: string;
}

export interface ISwaggerInfo {
    title: string;
    description?: string;
    termsOfService?: string;
    contact?: ISwaggerContact;
    license?: ISwaggerLicense;
    version: string;
}

export interface ISwaggerVariableServer {
    enum?: [string];
    default: string;
    description?: string;
}

export interface ISwaggerServer {
    url: string;
    description?: string;
    variables: [ISwaggerVariableServer]; // TODO : Fix it
}

export interface ISwaggerExternalDocs {
    description?: string;
    url: string;
}

export interface ISwaggerOperationParameter {
    name: string;
    in: string;
    type?: string;
    format?: string;
    description?: string;
    required?: boolean;
    minimum?: number;
    maximum?: number;
    default?: number;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    schema?: ISwaggerOperationSchema;
}

export interface ISwaggerPropertySchemaOperation {
    type: string;
}

export interface ISwaggerOperationSchema {
    type?: string;
    items?: { $ref: string };
    $ref?: string;
    format?: string;
    required?: string[]; // Array content name of property
    properties?: {[key: string] : ISwaggerPropertySchemaOperation}
}

export interface ISwaggerOperationSchemaItems {
    $ref: string;
}

export interface ISwaggerOperationResponse {
    description?: string;
    schema?: ISwaggerOperationSchema;
}

export interface ISwaggerOperation {
    tags?: string[];
    summary?: string;
    description?: string;
    operationId: string | symbol;
    parameters?: ISwaggerOperationParameter[];
    produces?: string[];
    consumes?: string[];
    responses?: { [key: string]: ISwaggerOperationResponse };
    security?: Array<{ [key: string]: any[] }>;
    deprecated?: boolean;
}

export interface ISwaggerTag {
    name: string;
    description: string;
}

export interface ISwaggerPath {
    get?: ISwaggerOperation;
    post?: ISwaggerOperation;
    put?: ISwaggerOperation;
    patch?: ISwaggerOperation;
    delete?: ISwaggerOperation;
}

export interface ISwaggerDefinitionPropertyItems {
    $ref?: string;
    type?: string;
}

export interface ISwaggerDefinitionProperty {
    type?: string; // Example : SwaggerDefinition.Definition.Property.Type.INTEGER
    format?: string; // Example : SwaggerDefinition.Definition.Property.Format.INT_64
    required?: boolean;
    description?: string;
    enum?: string[];
    items?: ISwaggerDefinitionPropertyItems;
    $ref?: string;
    example?: any []
}

export interface ISwaggerDefinitionXML {
    name: string;
}

export interface ISwaggerDefinition {
    type: string; // Example : SwaggerDefinition.Definition.Type.OBJECT
    required?: string[];
    properties: { [key: string]: ISwaggerDefinitionProperty };
    xml?: ISwaggerDefinitionXML;
    description?: string;
}

export interface ISwagger {
    basePath?: string;
    openapi?: string;
    info: ISwaggerInfo;
    servers?: [ISwaggerServer];
    paths?: { [key: string]: ISwaggerPath };
    host?: string;
    swagger: string;
    tags?: ISwaggerTag[];
    schemes: string[]; // Example : SwaggerDefinition.Scheme.HTTP
    produces: string[]; // Example : SwaggerDefinition.Produce.JSON
    consumes: string[]; // Example : SwaggerDefinition.Consume.JSON
    definitions: { [key: string]: ISwaggerDefinition };
    externalDocs?: ISwaggerExternalDocs;
    securityDefinitions?: { [key: string]: ISwaggerSecurityDefinition };
}
