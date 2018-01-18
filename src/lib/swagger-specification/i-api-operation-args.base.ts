export interface IApiOperationArgsBaseParameter {
    description?: string;
    type?: string;
    required?: boolean;
    format?: string;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    model?: string;
}

export interface IApiOperationArgsBaseResponse {
    description?: string;
    isArray?: boolean; // Default is "false"
    model?: string;
}

export interface IApiOperationArgsBaseParameters {
    path?: {[key: string]: IApiOperationArgsBaseParameter},
    query?: {[key: string]: IApiOperationArgsBaseParameter},
    body?: IApiOperationArgsBaseParameter, // use only for POST, PUT and PATCH
    formData?: {[key: string]: IApiOperationArgsBaseParameter}
}

export interface IApiOperationArgsBase {
    description?: string;
    summary?: string;
    produces?: string[];
    consumes?: string[];
    path?: string;
    parameters?: IApiOperationArgsBaseParameters;
    responses?: {[key: string]: IApiOperationArgsBaseResponse};
}