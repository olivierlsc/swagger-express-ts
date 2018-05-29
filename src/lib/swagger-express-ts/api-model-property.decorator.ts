import { SwaggerService } from "./swagger.service";
import { IApiOperationArgsBase } from "./i-api-operation-args.base";

export interface IApiModelPropertyArgs {
  required?: boolean;
  format?: string;
  type?: string;
  description?: string;
  enum?: string[];
  model?: string;
}

export function ApiModelProperty(
  args?: IApiModelPropertyArgs
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    let propertyType: any;
    if (Reflect.getMetadata(
      "design:type",
      target,
      propertyKey
    ) !== undefined) {
      propertyType = Reflect.getMetadata(
        "design:type",
        target,
        propertyKey
      ).name.toLowerCase();
    } else {
      propertyType = undefined;
    }
    SwaggerService.getInstance().addApiModelProperty(
      args,
      target,
      propertyKey,
      propertyType
    );
  };
}
