# ISwaggerBuildDefinitionModelProperty

## type: string

Define type of property.

*   Required
*   Example : [SwaggerDefinitionConstant](./swagger-definition-constant.md).Definition.Property.Type.STRING or "string"

## format: string

Define format of property.

*   Optional
*   Example : [SwaggerDefinitionConstant](./swagger-definition-constant.md).Definition.Property.Format.INT_64

## required: boolean

Define if property is required.

*   Optional
*   Default is false.

## model: string

Define model reference

*   Optional
*   If you want specify Array of model, you must set type with [SwaggerDefinitionConstant](./swagger-definition-constant.md).Definition.Property.Type.ARRAY

## description: string

Define description of property.

*   Optional

## enum: string[]

Define enum of property.

*   Optional

## itemType: string

Define item type.

*   Optional

Example:

```ts
...
app.use(
    swagger.express({
      definition: {
        ...
        models: {
          Author: {
               name: {
                 description: "Name of author",
                 type: SwaggerDefinitionConstant.Model.Property.Type.ARRAY,
                 itemType:
                   SwaggerDefinitionConstant.Model.Property.ItemType.STRING,
                 required: true
               }
             }
           }
        }
        ...
      }
    })
  );
...
```

## example: any[]

Define example.

*   Optional
