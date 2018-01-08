import { SwaggerService } from "./swagger.service";
export interface IApiPostArgs {
    description: string;
    summary: string;
}

export function ApiPost( args: IApiPostArgs ): MethodDecorator {
    return function ( target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor ) {
        SwaggerService.addPostAction( args, target, propertyKey );
    };
}
