import * as _ from "lodash";

export enum PatternEnum {
  URI,
  HOST
}

const URI_PATTERN = new RegExp(
  "([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?"
);

const HOST_PATTERN = new RegExp("^[^{}/ :\\\\]+(?::\\d+)?$");

const PATTERNS: { [pattern: string]: RegExp } = {
  URI: URI_PATTERN,
  HOST: HOST_PATTERN
};

export const PATTERN_KEY = Symbol("PATTERN_KEY");

/**
 *
 */
export interface PatternArguments {
  pattern: PatternEnum;
  /**
   * dotted notation for retrieve value from object to be validated against
   */
  path?: string;
  /**
   * flag when you want to validate only if value occurs (not null or undefined) default - false
   */
  nullable?: boolean;
}

export function Pattern(
  patternArguments: PatternArguments
): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    const existingPatternParameters: Array<{
      key: number;
      arguments: PatternArguments;
    }> =
      Reflect.getOwnMetadata(PATTERN_KEY, target, propertyKey) || [];
    existingPatternParameters.push({
      key: parameterIndex,
      arguments: patternArguments
    });
    Reflect.defineMetadata(
      PATTERN_KEY,
      existingPatternParameters,
      target,
      propertyKey
    );
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

export function validatePattern(
  object: any,
  patternArguments: PatternArguments
) {
  let propertyName: string | symbol;
  let nullable: boolean;

  propertyName = patternArguments.path;
  nullable = patternArguments.nullable;

  if (!object) {
    if (nullable) {
      return;
    }

    throw new Error(
      (propertyName ? (propertyName as string) : "Validated property")
        .concat(" is empty. Has to be valid ")
        .concat(PatternEnum[patternArguments.pattern])
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
      (propertyName ? (propertyName as string) : foundURI)
        .concat(" has to be valid ")
        .concat(PatternEnum[patternArguments.pattern])
    );
  }

  if (!foundURI.match(PATTERNS[PatternEnum[patternArguments.pattern]])) {
    throw new Error(
      (propertyName ? (propertyName as string) : foundURI)
        .concat(" has to be valid ")
        .concat(PatternEnum[patternArguments.pattern])
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
    const existingPatternParameters: Array<{
      key: number;
      arguments: PatternArguments;
    }> =
      Reflect.getOwnMetadata(PATTERN_KEY, target, propertyName) || [];
    if (existingPatternParameters) {
      let argument;
      for (const it of existingPatternParameters) {
        argument = arguments[it.key];
        validatePattern(argument, it.arguments);
      }
    }

    return method.apply(this, arguments);
  };
}
