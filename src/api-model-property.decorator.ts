import { SwaggerService } from '@/swagger.service';
import { IApiOperationArgsBase } from './i-api-operation-args.base';

export interface IApiModelPropertyArgs {
  /**
   * Define if property is required.
   * Optional. Default is false.
   */
  required?: boolean;

  /**
   * Define format of property. Example: SwaggerDefinitionConstant.Definition.Property.Format.INT_64
   * Optional.
   */
  format?: string;

  /**
   * Define type of property. Example: SwaggerDefinitionConstant.Definition.Property.Type.STRING
   * Optional.
   */
  type?: string;

  /**
   * Define description.
   * Optional.
   */
  description?: string;

  /**
   * Define enum;
   * Optional.
   */
  enum?: string[];

  /**
   * Define model.
   * Optional.
   */
  model?: string;

  /**
   * Define type of item. Example: SwaggerDefinitionConstant.Definition.Property.Type.STRING
   * Optional.
   */
  itemType?: string;

  /**
   * Define example.
   */
  example?: any | any[];
}

export function ApiModelProperty(
  args?: IApiModelPropertyArgs,
): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    let propertyType = '';

    if (
      args &&
      typeof args.itemType !== 'undefined' &&
      args.itemType !== null
    ) {
      propertyType = args.itemType;
    } else {
      try {
        propertyType = Reflect.getMetadata(
          'design:type',
          target,
          propertyKey,
        ).name;
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === "Cannot read property 'name' of undefined") {
            const message = error.message;
            throw new Error(
              `${message}. This usually occours due to a circular reference between models. 
                A possible solution is to set the itemType argument of the @ApiModelProperty to a 
                string that matches the class name of the field type. The field in question is named 
                ${String(propertyKey)}.`,
            );
          } else {
            throw error;
          }
        }
      }
    }

    SwaggerService.getInstance().addApiModelProperty(
      args || {},
      target,
      propertyKey,
      propertyType,
    );
  };
}
