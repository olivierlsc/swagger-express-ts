export function ApiPath( path: string ): ClassDecorator {
    console.log( path );
    return function ( target: any ) {
        console.log( target );
    }
}