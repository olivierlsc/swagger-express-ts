import * as _ from "lodash";

const pattern = new RegExp(
  "([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?"
);

export const URI_KEY = Symbol("URI_KEY");

/**
 *
 */
export interface URIValidateArguments {
  /**
   * dotted notation for retrieve value from object to be validated against
   */
  path?: string;
  /**
   * flag when you want to validate only if value occurs (not null or undefined) default - false
   */
  nullable?: boolean;
}

export function URI(uriArguments?: URIValidateArguments): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    const existingURIParameters: Array<{
      key: number;
      arguments: URIValidateArguments;
    }> =
      Reflect.getOwnMetadata(URI_KEY, target, propertyKey) || [];
    existingURIParameters.push({
      key: parameterIndex,
      arguments: uriArguments
    });
    Reflect.defineMetadata(URI_KEY, existingURIParameters, target, propertyKey);
  };
}

/**
 * Function to retrieve property based on dot notation.
 * Currently supporting only object.field.field.field, array will be supported when needed
 *
 * @param object
 * @param propertyName
 */
export function getProperty(object: any, propertyName: string | symbol): any {
  const parts: string[] = (propertyName as string).split(".");
  let property: any = object || this;

  _.forEach(parts, (part: string) => {
    property = property[part];
  });

  return property;
}

export function validateURIPattern(
  object: any,
  uriArguments: URIValidateArguments
) {
  let propertyName: string | symbol;
  let nullable: boolean;

  if (uriArguments) {
    propertyName = uriArguments.path;
    nullable = uriArguments.nullable;
  }

  if (!object) {
    if (nullable) {
      return;
    }

    throw new Error(
      (propertyName ? (propertyName as string) : "Validated property").concat(
        " is empty. Has to be valid URI"
      )
    );
  }

  let foundURI: string = object;

  if (propertyName && typeof object === "object") {
    foundURI = getProperty(object, propertyName);
  }

  if (!foundURI) {
    if (nullable) {
      return;
    }

    throw new Error(
      (propertyName ? (propertyName as string) : foundURI).concat(
        " has to be valid URI"
      )
    );
  }

  if (!foundURI.match(pattern)) {
    throw new Error(
      (propertyName ? (propertyName as string) : foundURI).concat(
        " has to be valid URI"
      )
    );
  }
}

export function Validate(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<(param: any) => void>
) {
  const method = descriptor.value;

  descriptor.value = function() {
    const existingURIParameters: Array<{
      key: number;
      arguments: URIValidateArguments;
    }> =
      Reflect.getOwnMetadata(URI_KEY, target, propertyName) || [];
    if (existingURIParameters) {
      let argument;
      for (const it of existingURIParameters) {
        argument = arguments[it.key];
        validateURIPattern(argument, it.arguments);
      }
    }

    return method.apply(this, arguments);
  };
}

/*export function Validate(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<() => void>
): MethodDecorator {
  const method = descriptor.value;
  console.log(arguments);
  /*descriptor.value = function () {
      const existingURIParameters: Array<{key: number, fieldPath: URIValidateArguments}> = Reflect.getOwnMetadata(URI_KEY, target, propertyName) || [];
      if(existingURIParameters){
        let argument;
        for (let it of existingURIParameters) {
            argument = arguments[it.key];
        }
      }
  };

  return method.apply(this, arguments);
}/**/
