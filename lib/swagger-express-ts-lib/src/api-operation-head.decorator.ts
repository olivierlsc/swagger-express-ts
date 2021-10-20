import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './i-api-operation-args.base';
export interface IApiOperationHeadArgs extends IApiOperationArgsBase {}

export function ApiOperationHead(args: IApiOperationHeadArgs): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        SwaggerService.getInstance().addOperationHead(args, target, propertyKey);
    };
}
