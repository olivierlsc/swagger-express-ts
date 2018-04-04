# @ApiModel(args?: IApiModelArgs)

Decorate model class.

Example:

```ts
    @ApiModel({
      description: "Version description"
    })
    export class Version {
     ...
    }
```

# IApiModelArgs

## description: string

Define description
- Optional