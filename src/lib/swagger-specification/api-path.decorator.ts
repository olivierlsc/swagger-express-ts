export function ApiPath( path: string ) {
    console.log( path );
    return function ( target: any, propertyKey: string, descriptor: PropertyDescriptor ) {
        console.log( target );
        console.log( propertyKey );
        console.log( descriptor );
    };
}
