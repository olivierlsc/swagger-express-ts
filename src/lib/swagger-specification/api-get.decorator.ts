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
