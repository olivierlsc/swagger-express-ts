import { SwaggerService } from "./swagger.service";
export interface IApiGetArgs {
    description: string;
    summary: string;
}

export function ApiGet( args: IApiGetArgs ): MethodDecorator {
    return function ( target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor ) {
        SwaggerService.addGetAction( args, target, propertyKey );
    };
}
