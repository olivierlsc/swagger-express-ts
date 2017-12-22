export interface ILicenseData {
    name: string;
    url?: string;
}

export interface IContactData {
    name?: string;
    url?: string;
    email?: string;
}

export interface IInfoData {
    title: string;
    description?: string;
    termsOfService?: string;
    contact: IContactData;
    license: ILicenseData;
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

export interface ISwaggerData {
    basePath?: string;
    openapi: string;
    info: IInfoData;
    servers?: [IServer];
    paths: any;
}
