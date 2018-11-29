# @ApiModelProperty(args?: IApiModelPropertyArgs)

Decorate property in model class.

Example:

```ts
@ApiModel({
  description: "Version description",
  name: "Version"
})
export class VersionModel {

  @ApiModelProperty({
    description: "number value",
    enum : ['1', '2']
  })
  number: number;
  ...
}
```

# IApiModelPropertyArgs

## required: boolean

Define if property is required.

*   Optional

## format: string

Define format.

*   Optional

## type: string

Define type of property.

*   Optional

## description: string

Define description of property.

*   Optional

## enum: string[]

Define enum of property.

*   Optional

## model: string

Define model

*   Optional

## itemType: string

Define item type.

*   Optional

## example: any[]

Define example.

*   Optional
