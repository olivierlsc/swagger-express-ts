import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './i-api-operation-args.base';
export interface IApiOperationPatchArgs extends IApiOperationArgsBase {}

export function ApiOperationPatch(
    args: IApiOperationPatchArgs
): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        SwaggerService.getInstance().addOperationPatch(
            args,
            target,
            propertyKey
        );
    };
}
