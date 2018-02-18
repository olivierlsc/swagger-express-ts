# Configuration

## .express(options: ISwaggerExpressOptions)
Example with default configuration:

```ts
app.use( swagger.express({
    definition : {
        info : {
            title : "My api" ,
            version : "1.0"
        } ,
        models : {
            Version : {
                properties : {
                    id : {
                        type : SwaggerDefinitionConstant.Model.Property.Type.STRING ,
                        required : true
                    } ,
                    name : {
                        type : SwaggerDefinitionConstant.Model.Property.Type.STRING ,
                        required : true
                    } ,
                    description : {
                        type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                    } ,
                    version : {
                        type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                    }
                }
            }
        } ,
        externalDocs : {
            url : "My url"
        }
    }
}) );
```

# ISwaggerExpressOptions

## path: string
Define path to serve swagger.json
- Optional. 
- Default is "/api-docs/swagger.json".

## definition: [ISwaggerBuildDefinition](./i-swagger-build-definition.md)
Define swagger definition.
- Required