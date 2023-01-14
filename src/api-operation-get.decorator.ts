import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './i-api-operation-args.base';
export type IApiOperationGetArgs = IApiOperationArgsBase;

export function ApiOperationGet(args: IApiOperationGetArgs): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    SwaggerService.getInstance().addOperationGet(args, target, propertyKey);
  };
}
