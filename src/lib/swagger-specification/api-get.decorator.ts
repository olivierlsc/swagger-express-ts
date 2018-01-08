import { SwaggerService } from "./swagger.service";
import { IApiActionArgsBase } from "./i-api-action-args.base";
export interface IApiGetArgs extends IApiActionArgsBase{

}

export function ApiGet( args: IApiGetArgs ): MethodDecorator {
    return function ( target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor ) {
        SwaggerService.addGetAction( args, target, propertyKey );
    };
}
