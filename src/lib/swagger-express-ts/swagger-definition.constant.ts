export class SwaggerDefinitionConstant {
  private static JSON: string = "application/json";
  private static XML: string = "application/xml";
  private static OBJECT: string = "object";
  private static INTEGER: string = "integer";
  private static STRING: string = "string";
  private static ARRAY: string = "array";
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
        INTEGER: SwaggerDefinitionConstant.INTEGER,
        ARRAY: SwaggerDefinitionConstant.ARRAY,
        STRING: SwaggerDefinitionConstant.STRING
      },
      Format: {
        INT_64: "int64"
      }
    }
  };

  public static Parameter = {
    Type: {
      INTEGER: SwaggerDefinitionConstant.INTEGER,
      STRING: SwaggerDefinitionConstant.STRING,
      ARRAY: SwaggerDefinitionConstant.ARRAY
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
      INTEGER: SwaggerDefinitionConstant.INTEGER,
      STRING: SwaggerDefinitionConstant.STRING,
      ARRAY: SwaggerDefinitionConstant.ARRAY
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
