export class SwaggerDefinitionConstant {
  public static JSON: string = "application/json";
  public static XML: string = "application/xml";
  public static ZIP: string = "application/zip";
  public static PDF: string = "application/pdf";
  public static X_WWW_FORM_URLENCODED: string = "application/x-www-form-urlencoded";
  public static FORM_DATA: string = "multipart/form-data";
  public static TEXT_PLAIN: string = "text/plain";
  public static TEXT_HTML: string = "text/html";
  public static PNG: string = "image/png";
  public static GIF: string = "image/gif";
  public static JPEG: string = "image/jpeg";
  public static STRING: string = "string";
  public static NUMBER: string = "number";
  public static INTEGER: string = "integer";
  public static BOOLEAN: string = "boolean";
  public static ARRAY: string = "array";
  public static OBJECT: string = "object";
  public static QUERY: string = "query";
  public static FLOAT: string = "float";
  public static DOUBLE: string = "double";
  public static INT_32: string = "int32";
  public static INT_64: string = "int64";

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
        FLOAT: SwaggerDefinitionConstant.FLOAT,
        DOUBLE: SwaggerDefinitionConstant.DOUBLE,
        INT_32: SwaggerDefinitionConstant.INT_32,
        INT_64: SwaggerDefinitionConstant.INT_64
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
    },
    Format: {
      FLOAT: SwaggerDefinitionConstant.FLOAT,
      DOUBLE: SwaggerDefinitionConstant.DOUBLE,
      INT_32: SwaggerDefinitionConstant.INT_32,
      INT_64: SwaggerDefinitionConstant.INT_64
    }
  };

  public static Security = {
    Type: {
      BASIC_AUTHENTICATION: "basic",
      API_KEY: "apiKey",
      BEARER: "Bearer",
      OAUTH2: "OAuth2",
      OPENID: "OpenID"
    },
    In: {
      HEADER: "header",
      QUERY: SwaggerDefinitionConstant.QUERY
    }
  };
}
