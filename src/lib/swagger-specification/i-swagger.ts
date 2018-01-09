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
    contact: ISwaggerContact;
    license: ISwaggerLicense;
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
    variables: [ISwaggerVariableServer]; //TODO : Fix it
}

export interface ISwaggerExternalDocs {
    description?: string;
    url: string;
}

export interface ISwaggerParameter {
    name: string;
    in: string;
    description?: string;
    required: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
}

export interface ISwaggerOperation {
    tags?: [string];
    summary?: string;
    description?: string;
    externalDocs: ISwaggerExternalDocs;
    operationId?: string;
    parameters?: [ISwaggerParameter];
}

export interface ISwaggerTag {
    name: string;
    description: string;
}

export interface ISwaggerAction {
    path?: string;
    description: string;
    summary: string;
    tags: string[];
    operationId: string | symbol;
    produces: string[]
}

export interface ISwaggerPath {
    get?: ISwaggerAction;
    post?: ISwaggerAction;
    put?: ISwaggerAction;
    delete?: ISwaggerAction;
}

export interface ISwagger {
    basePath?: string;
    openapi: string;
    info: ISwaggerInfo;
    servers?: [ISwaggerServer];
    paths?: {[key: string]: ISwaggerPath};
    host?: string;
    swagger: string;
    tags?: ISwaggerTag[];
    schemes: string[];
    produces: string[];
}
