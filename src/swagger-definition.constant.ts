export class SwaggerDefinitionConstant {
  public static JSON = 'application/json';
  public static XML = 'application/xml';
  public static ZIP = 'application/zip';
  public static PDF = 'application/pdf';
  public static X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded';
  public static FORM_DATA = 'multipart/form-data';
  public static TEXT_PLAIN = 'text/plain';
  public static TEXT_HTML = 'text/html';
  public static PNG = 'image/png';
  public static GIF = 'image/gif';
  public static JPEG = 'image/jpeg';
  public static STRING = 'string';
  public static NUMBER = 'number';
  public static INTEGER = 'integer';
  public static BOOLEAN = 'boolean';
  public static ARRAY = 'array';
  public static OBJECT = 'object';
  public static QUERY = 'query';

  public static Produce = {
    FORM_DATA: SwaggerDefinitionConstant.FORM_DATA,
    GIF: SwaggerDefinitionConstant.GIF,
    JPEG: SwaggerDefinitionConstant.JPEG,
    JSON: SwaggerDefinitionConstant.JSON,
    PDF: SwaggerDefinitionConstant.PDF,
    PNG: SwaggerDefinitionConstant.PNG,
    TEXT_HTML: SwaggerDefinitionConstant.TEXT_HTML,
    TEXT_PLAIN: SwaggerDefinitionConstant.TEXT_PLAIN,
    XML: SwaggerDefinitionConstant.XML,
    X_WWW_FORM_URLENCODED: SwaggerDefinitionConstant.X_WWW_FORM_URLENCODED,
    ZIP: SwaggerDefinitionConstant.ZIP,
  };

  public static Scheme = {
    HTTP: 'http',
    HTTPS: 'https',
  };

  public static Consume = {
    JSON: SwaggerDefinitionConstant.JSON,
    XML: SwaggerDefinitionConstant.XML,
  };

  public static Model = {
    Property: {
      Format: {
        INT_64: 'int64',
        INT_32: 'int32',
        FLOAT: 'float',
        DOUBLE: 'double',
        BYTE: 'byte',
        BINARY: 'binary',
        DATE: 'date',
        DATE_TIME: 'date-time',
        PASSWORD: 'password',
      },
      ItemType: {
        BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
        INTEGER: SwaggerDefinitionConstant.INTEGER,
        NUMBER: SwaggerDefinitionConstant.NUMBER,
        STRING: SwaggerDefinitionConstant.STRING,
      },
      Type: {
        ARRAY: SwaggerDefinitionConstant.ARRAY,
        BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
        INTEGER: SwaggerDefinitionConstant.INTEGER,
        NUMBER: SwaggerDefinitionConstant.NUMBER,
        OBJECT: SwaggerDefinitionConstant.OBJECT,
        STRING: SwaggerDefinitionConstant.STRING,
      },
    },
    Type: {
      OBJECT: SwaggerDefinitionConstant.OBJECT,
      ARRAY: SwaggerDefinitionConstant.ARRAY,
    },
  };

  public static Parameter = {
    In: {
      HEADER: 'header',
      BODY: 'body',
      FORM_DATA: 'formData',
      PATH: 'path',
      QUERY: SwaggerDefinitionConstant.QUERY,
    },
    Type: {
      ARRAY: SwaggerDefinitionConstant.ARRAY,
      BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
      INTEGER: SwaggerDefinitionConstant.INTEGER,
      NUMBER: SwaggerDefinitionConstant.NUMBER,
      OBJECT: SwaggerDefinitionConstant.OBJECT,
      STRING: SwaggerDefinitionConstant.STRING,
    },
  };

  public static Response = {
    Type: {
      ARRAY: SwaggerDefinitionConstant.ARRAY,
      BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
      INTEGER: SwaggerDefinitionConstant.INTEGER,
      NUMBER: SwaggerDefinitionConstant.NUMBER,
      OBJECT: SwaggerDefinitionConstant.OBJECT,
      STRING: SwaggerDefinitionConstant.STRING,
    },
  };

  public static Security = {
    In: {
      HEADER: 'header',
      QUERY: SwaggerDefinitionConstant.QUERY,
    },
    Type: {
      API_KEY: 'apiKey',
      BASIC_AUTHENTICATION: 'basic',
    },
  };
}
