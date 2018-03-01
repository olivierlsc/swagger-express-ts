# @ApiPath(args: IApiPathArgs)

Decorate your controller to declare a resource.

Example:

```ts
import { injectable } from "inversify";
import "reflect-metadata";
import { ApiPath } from "swagger-express-ts";
import { controller } from "inversify-express-utils";

@ApiPath( {
    path : "/version",
    name : "Version"
} )
@controller( "/version" )
@injectable()
export class VersionController implements interfaces.Controller {
  public static TARGET_NAME: string = "VersionController";
}
```

# IApiPathArgs

## path: string
Define path of resource.
- Required

## name: string
Define name of resource.
- Required

## description: string
Define description of resource.
- Optional

## security: {[key: string]: any[]}
Define security to apply all operations from current path.
- Optional

Example:

```ts
    ...
    @ApiPath( {
        path : "/version",
        name : "Version",
        security : {
            basicAuth : []
        }
    } )
    ...
```