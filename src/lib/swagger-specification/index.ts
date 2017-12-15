interface ISwaggerJson {
    basePath: string;
    definitions: [];
    externalDocs: {description: string, url: string};
    host: string;
    info: {
        contact: { email: string},
        description: string,
        licence: {name: string, url: string},
        termsOfService: string,
        title: string,
        version: string
    };
    paths: [];
    schemes: [];
    swagger: string;
    tags: [{name: string, description: string}]
}

let swaggerJson: ISwaggerJson = {};

export function ApiPath( path: string ) {
    console.log( path );
    return function ( target: any, propertyKey: string, descriptor: PropertyDescriptor ) {
        console.log( target );
        console.log( propertyKey );
        console.log( descriptor );
    };
}

export interface IApiGetArgs {
    description: string;
    summary: string;
}

export function ApiGet( args: IApiGetArgs ) {
    console.log( args );
    return function ( target: any, propertyKey: string, descriptor: PropertyDescriptor ) {
        console.log( target );
        console.log( propertyKey );
        console.log( descriptor );
    };
}