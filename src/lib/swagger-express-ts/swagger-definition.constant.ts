export class SwaggerDefinitionConstant {
    private static JSON : string = "application/json";
    private static XML : string = "application/xml";
    private static OBJECT : string = "object";
    private static INTEGER : string = "integer";
    private static STRING : string = "string";
    private static ARRAY : string = "array";
    public static Produce = {
        XML : SwaggerDefinitionConstant.XML ,
        JSON : SwaggerDefinitionConstant.JSON
    };

    public static Scheme = {
        HTTP : "http" ,
        HTTPS : "https"
    };

    public static Consume = {
        XML : SwaggerDefinitionConstant.XML ,
        JSON : SwaggerDefinitionConstant.JSON
    };

    public static Model = {
        Type : {
            OBJECT : SwaggerDefinitionConstant.OBJECT
        } ,
        Property : {
            Type : {
                INTEGER : SwaggerDefinitionConstant.INTEGER ,
                STRING : SwaggerDefinitionConstant.STRING
            } ,
            Format : {
                INT_64 : "int64"
            }
        }
    };

    public static Parameter = {
        Type : {
            INTEGER : SwaggerDefinitionConstant.INTEGER ,
            STRING : SwaggerDefinitionConstant.STRING ,
            ARRAY : SwaggerDefinitionConstant.ARRAY
        } ,
        In : {
            PATH : "path" ,
            QUERY : "query" ,
            BODY : "body" ,
            FORM_DATA : "formData"
        }
    };

    public static Response = {
        Type : {
            INTEGER : SwaggerDefinitionConstant.INTEGER ,
            STRING : SwaggerDefinitionConstant.STRING ,
            ARRAY : SwaggerDefinitionConstant.ARRAY
        }
    };
}