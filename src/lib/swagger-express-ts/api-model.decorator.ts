import { SwaggerService } from "./swagger.service";

export interface IApiModelArgs {
  description?: string;
  name?: string;
}

export function ApiModel(args?: IApiModelArgs): ClassDecorator {
  return (target: any) => {
    // Extracting possible super class from prototype
    const protoType = Object.getPrototypeOf(target).name;
    let superClass = null;
    if (protoType !== "") {
      superClass = protoType;
    }

    SwaggerService.getInstance().addApiModel(args, target, superClass);
  };
}
