import { SwaggerService } from "./swagger.service";
import { IApiActionArgsBase } from "./i-api-action-args.base";
export interface IApiOperationGetArgs extends IApiActionArgsBase{

}

export function ApiOperationGet( args: IApiOperationGetArgs ): MethodDecorator {
    return function ( target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor ) {
        SwaggerService.addGetAction( args, target, propertyKey );
    };
}
