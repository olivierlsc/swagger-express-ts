import { SwaggerService } from "./swagger.service";
export interface IApiGetArgs {
    description: string;
    summary: string;
}

export function ApiGet( args: IApiGetArgs ): MethodDecorator {
    console.log( args );
    SwaggerService.setData( args );
    return function ( target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor ) {
        console.log( target );
        console.log( propertyKey );
        console.log( descriptor );
    };
}
