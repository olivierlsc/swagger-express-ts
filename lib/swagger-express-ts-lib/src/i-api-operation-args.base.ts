export interface IApiOperationArgsBaseParameter {
    name?: string; // Override [key: string]. Default [key: string].
    description?: string;
    type?: string;
    required?: boolean;
    format?: string;
    minimum?: number;
    maximum?: number;
    default?: number;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
}

export interface IApiPropertyBodyOperationArgsBaseParameter {
    type: string;
    required?: boolean;
}

export interface IApiBodyOperationArgsBaseParameter
    extends IApiOperationArgsBaseParameter {
    properties?: { [key: string]: IApiPropertyBodyOperationArgsBaseParameter };
    model?: string;
}

export interface IApiOperationArgsBaseResponse {
    description?: string;
    type?: string;
    model?: string;
}

export interface IApiOperationArgsBaseParameters {
    header?: { [key: string]: IApiOperationArgsBaseParameter };
    path?: { [key: string]: IApiOperationArgsBaseParameter };
    query?: { [key: string]: IApiOperationArgsBaseParameter };
    body?: IApiBodyOperationArgsBaseParameter; // use only for POST, PUT and PATCH
    formData?: { [key: string]: IApiOperationArgsBaseParameter };
}

export interface IApiOperationArgsBase {
    /**
     * Define description
     * Optional.
     */
    description?: string;

    /**
     * Define summary
     * Optional.
     */
    summary?: string;

    /**
     * Define produces
     * Optional.
     */
    produces?: string[];

    /**
     * Define consumes
     * Optional.
     */
    consumes?: string[];

    /**
     * Define path
     * Optional.
     */
    path?: string;

    /**
     * Define parameters
     * Optional.
     */
    parameters?: IApiOperationArgsBaseParameters;

    /**
     * Define responses
     */
    responses: { [key: string]: IApiOperationArgsBaseResponse };

    /**
     * Define security
     * Optional.
     */
    security?: { [key: string]: any[] };

    /**
     * Define deprecated
     * Optional.
     */
    deprecated?: boolean;
}
