import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './i-api-operation-args.base';
export interface IApiOperationDeleteArgs extends IApiOperationArgsBase {}

export function ApiOperationDelete(
    args: IApiOperationDeleteArgs
): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        SwaggerService.getInstance().addOperationDelete(
            args,
            target,
            propertyKey
        );
    };
}
