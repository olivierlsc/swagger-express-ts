import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './i-api-operation-args.base';
export type IApiOperationPutArgs = IApiOperationArgsBase;

export function ApiOperationPut(args: IApiOperationPutArgs): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    SwaggerService.getInstance().addOperationPut(args, target, propertyKey);
  };
}
