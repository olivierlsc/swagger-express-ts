export class SwaggerDefinitionConstant {
  private static JSON: string = "application/json";
  private static XML: string = "application/xml";
  private static ZIP: string = "application/zip";
  private static PDF: string = "application/pdf";
  private static X_WWW_FORM_URLENCODED: string = "application/x-www-form-urlencoded";
  private static FORM_DATA: string = "multipart/form-data";
  private static TEXT_PLAIN: string = "text/plain";
  private static TEXT_HTML: string = "text/html";
  private static PNG: string = "image/png";
  private static GIF: string = "image/gif";
  private static JPEG: string = "image/jpeg";
  private static STRING: string = "string";
  private static NUMBER: string = "number";
  private static INTEGER: string = "integer";
  private static BOOLEAN: string = "boolean";
  private static ARRAY: string = "array";
  private static OBJECT: string = "object";
  private static QUERY: string = "query";
  public static Produce = {
    JSON: SwaggerDefinitionConstant.JSON,
    XML: SwaggerDefinitionConstant.XML,
    ZIP: SwaggerDefinitionConstant.ZIP,
    PDF: SwaggerDefinitionConstant.PDF,
    X_WWW_FORM_URLENCODED: SwaggerDefinitionConstant.X_WWW_FORM_URLENCODED,
    FORM_DATA: SwaggerDefinitionConstant.FORM_DATA,
    TEXT_PLAIN: SwaggerDefinitionConstant.TEXT_PLAIN,
    TEXT_HTML: SwaggerDefinitionConstant.TEXT_HTML,
    PNG: SwaggerDefinitionConstant.PNG,
    GIF: SwaggerDefinitionConstant.GIF,
    JPEG: SwaggerDefinitionConstant.JPEG
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
      ItemType: {
        STRING: SwaggerDefinitionConstant.STRING,
        NUMBER: SwaggerDefinitionConstant.NUMBER,
        INTEGER: SwaggerDefinitionConstant.INTEGER,
        BOOLEAN: SwaggerDefinitionConstant.BOOLEAN
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
