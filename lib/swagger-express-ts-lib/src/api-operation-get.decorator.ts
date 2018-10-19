import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './i-api-operation-args.base';
export interface IApiOperationGetArgs extends IApiOperationArgsBase {}

export function ApiOperationGet(args: IApiOperationGetArgs): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        SwaggerService.getInstance().addOperationGet(args, target, propertyKey);
    };
}
