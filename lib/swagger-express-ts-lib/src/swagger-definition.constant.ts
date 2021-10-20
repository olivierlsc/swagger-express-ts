export class SwaggerDefinitionConstant {
    public static JSON: string = 'application/json';
    public static XML: string = 'application/xml';
    public static ZIP: string = 'application/zip';
    public static PDF: string = 'application/pdf';
    public static X_WWW_FORM_URLENCODED: string = 'application/x-www-form-urlencoded';
    public static FORM_DATA: string = 'multipart/form-data';
    public static TEXT_PLAIN: string = 'text/plain';
    public static TEXT_HTML: string = 'text/html';
    public static PNG: string = 'image/png';
    public static GIF: string = 'image/gif';
    public static JPEG: string = 'image/jpeg';
    public static STRING: string = 'string';
    public static NUMBER: string = 'number';
    public static INTEGER: string = 'integer';
    public static BOOLEAN: string = 'boolean';
    public static ARRAY: string = 'array';
    public static OBJECT: string = 'object';
    public static QUERY: string = 'query';

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
                PASSWORD: 'password'
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
