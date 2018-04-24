export class SwaggerDefinitionConstant {
  private static JSON: string = "application/json";
  private static XML: string = "application/xml";
  private static STRING: string = "string";
  private static NUMBER: string = "number";
  private static INTEGER: string = "integer";
  private static BOOLEAN: string = "boolean";
  private static ARRAY: string = "array";
  private static OBJECT: string = "object";
  private static QUERY: string = "query";
  public static Produce = {
    XML: SwaggerDefinitionConstant.XML,
    JSON: SwaggerDefinitionConstant.JSON
  };

  public static Scheme = {
    HTTP: "http",
    HTTPS: "https"
  };

  public static Consume = {
    XML: SwaggerDefinitionConstant.XML,
    JSON: SwaggerDefinitionConstant.JSON
  };

  public static Model = {
    Type: {
      OBJECT: SwaggerDefinitionConstant.OBJECT,
      ARRAY: SwaggerDefinitionConstant.ARRAY
    },
    Property: {
      Type: {
        STRING: SwaggerDefinitionConstant.STRING,
        NUMBER: SwaggerDefinitionConstant.NUMBER,
        INTEGER: SwaggerDefinitionConstant.INTEGER,
        BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
        ARRAY: SwaggerDefinitionConstant.ARRAY,
        OBJECT: SwaggerDefinitionConstant.OBJECT
      },
      Format: {
        INT_64: "int64"
      }
    }
  };

  public static Parameter = {
    Type: {
      STRING: SwaggerDefinitionConstant.STRING,
      NUMBER: SwaggerDefinitionConstant.NUMBER,
      INTEGER: SwaggerDefinitionConstant.INTEGER,
      BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
      ARRAY: SwaggerDefinitionConstant.ARRAY,
      OBJECT: SwaggerDefinitionConstant.OBJECT
    },
    In: {
      PATH: "path",
      QUERY: SwaggerDefinitionConstant.QUERY,
      BODY: "body",
      FORM_DATA: "formData"
    }
  };

  public static Response = {
    Type: {
      STRING: SwaggerDefinitionConstant.STRING,
      NUMBER: SwaggerDefinitionConstant.NUMBER,
      INTEGER: SwaggerDefinitionConstant.INTEGER,
      BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
      ARRAY: SwaggerDefinitionConstant.ARRAY,
      OBJECT: SwaggerDefinitionConstant.OBJECT
    }
  };

  public static Security = {
    Type: {
      BASIC_AUTHENTICATION: "basic",
      API_KEY: "apiKey"
    },
    In: {
      HEADER: "header",
      QUERY: SwaggerDefinitionConstant.QUERY
    }
  };
}
