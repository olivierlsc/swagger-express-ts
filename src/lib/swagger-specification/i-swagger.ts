export interface ILicense {
    name: string;
    url?: string;
}

export interface IContact {
    name?: string;
    url?: string;
    email?: string;
}

export interface IInfo {
    title: string;
    description?: string;
    termsOfService?: string;
    contact: IContact;
    license: ILicense;
    version: string;
}

export interface IVariableServer {
    enum?: [string];
    default: string;
    description?: string;
}

export interface IServer {
    url: string;
    description?: string;
    variables: [IVariableServer]; //TODO : Fix it
}

export interface IExternalDocs {
    description?: string;
    url: string;
}

export interface IParameter {
    name: string;
    in: string;
    description?: string;
    required: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
}

export interface IOperation {
    tags?: [string];
    summary?: string;
    description?: string;
    externalDocs: IExternalDocs;
    operationId?: string;
    parameters?: [IParameter];
}

export interface ISwagger {
    basePath?: string;
    openapi: string;
    info: IInfo;
    servers?: [IServer];
    paths: any;
    host?: string;
    swagger: string;
}
