import { SwaggerService } from "./swagger.service";
import { IApiActionArgsBase } from "./i-api-action-args.base";
export interface IApiOperationPostArgs extends IApiActionArgsBase {

}

export function ApiOperationPost( args: IApiOperationPostArgs ): MethodDecorator {
    return function ( target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor ) {
        SwaggerService.addPostAction( args, target, propertyKey );
    };
}
