<a name="1.0.1"></a>

# [1.0.1](2018-12-4)

## Features

### example

Example:

```ts
...
@ApiModelProperty({
        description: 'Id of car',
        required: true,
        example: ['123456789', '12345'],
    })
    id: string;
    ...
}
```

or

```ts
...
app.use(
    swagger.express({
            ...
            models: {
                ApiError: {
                    properties: {
                        code: {
                            type:
                                SwaggerDefinitionConstant.Model.Property
                                    .Type.STRING,
                            example: ['400'],
                        },
                        message: {
                            type:
                                SwaggerDefinitionConstant.Model.Property
                                    .Type.STRING,
                            example: ['Name of car is required.'],
                        },
                    },
                },
            },
            ...
        },
    })
);
...
```

### body in parameter

Example:

```ts
...
@ApiOperationPost({
    ...
    parameters: {
        body: {
            description: 'New car',
            required: true,
            model: 'Car',
        },
    },
    ...
})
...
```

or

```ts
...
@ApiOperationPost({
    ...
    parameters: {
        body: {
            required: true,
            properties: {
              name: { type: SwaggerDefinitionConstant.Parameter.Type.STRING, required: true}
            }
        },
    },
    ...
})
...
```

<a name="1.0.0"></a>

# [1.0.0](2018-06-10)

## Features

### itemType

Example:

```ts
...
@ApiModelProperty({
    description: "Name of author",
    required: true,
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING
  })
name: string[];
...
```

or

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

<a name="1.0.0-rc.4"></a>

# [1.0.0-rc.4](2018-05-18)

## Features

### Add global responses

Example:

```ts
swagger.express({
  definition: {
    ...
    responses: {
      500: {}
    },
    ...
  }
})
```

## Fixes

### Fix ApiModel when arg "name" and class name are equal.

<a name="1.0.0-rc.3"></a>

# [1.0.0-rc.3](2018-04-30)

## Fixes

### Merge models and path

<a name="1.0.0-rc.2"></a>

# [1.0.0-rc.2](2018-04-26)

## Features

### Name

Merge name when several controllers that point to the same name .

Example:

```ts
@ApiPath({
  path: "/versions",
  name: "Version"
})
...
export class VersionsController implements interfaces.Controller {
    ...
}

@ApiPath({
  path: "/versions/:id",
  name: "Version"
})
...
export class VersionController implements interfaces.Controller {
    ...
}
```

<a name="1.0.0-rc.1"></a>

# [1.0.0-rc.1](2018-04-08)

## Features

### Model

#### Configuration

example:

```ts
definition : {
    ...
    models : {
        Version : {
            properties : {
                id : {
                    type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
                    required : true
                },
                name : {
                    type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
                    required : true
                },
                description : {
                    type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                },
                version : {
                    type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                },
                author: {
                    model: "Author"
                }
            }
        },
        Author: {
            properties: {
                id: {
                    type: SwaggerDefinitionConstant.Model.Property.Type.STRING,
                    required : true
                },
                name : {
                    type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
                    required : true
                },
            }
        }
    },
    ...
}
```

or

```ts
@ApiModel({
    description: 'Version description',
    name: 'Version',
})
export class VersionModel {
    @ApiModelProperty({
        description: 'Id of version',
        required: true,
    })
    id: number;

    @ApiModelProperty({
        description: '',
        required: true,
    })
    name: string;

    @ApiModelProperty({
        description: 'Description of version',
        required: true,
    })
    description: string;

    @ApiModelProperty({
        description: 'Author of version',
        model: 'Author',
    })
    author: AuthorModel;
}
```

#### Controller

example:

```ts
@ApiOperationGet( {
    ...
    responses : {
        200 : { description : "Success" , type : SwaggerDefinitionConstant.Response.Type.ARRAY , model : "Version" }
    } ,
    ...
} )
```

<a name="1.0.0-beta.1"></a>

# [1.0.0-beta.1](2018-03-02)

## Features

### Authentication

#### Configuration

example:

```ts
app.use( swagger.express(
    {
        definition : {
            ...
            securityDefinitions : {
                basicAuth : {
                    type : SwaggerDefinitionConstant.Security.Type.BASIC_AUTHENTICATION
                },
                apiKeyHeader : {
                    type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                    in: SwaggerDefinitionConstant.Security.In.HEADER,
                    name: "apiHeader"
                }
            }
        }
    }
) );
```

#### Basic Authentication

Example:

```ts
...
@ApiOperationGet( {
    ...
    security : {
        basicAuth : []
    }
} )
...
```

#### API Keys

Example:

```ts
...
@ApiOperationGet( {
    ...
    security : {
        apiKeyHeader : []
    }
} )
...
```

### Operations as deprecated

Example in path:

```ts
...
@ApiPath( {
    ...
    deprecated: true
} )
...
```

Example in operation:

```ts
...
@ApiOperationGet( {
    ...
    deprecated: true
} )
...
```

<a name="1.0.0-alpha.5"></a>

# [1.0.0-alpha.5](2018-02-18)

## Features

### externalDocs

Example:

```ts
app.use(
    swagger.express({
        definition: {
            info: {
                title: 'My api',
                version: '1.0',
            },
            models: {
                Version: {
                    properties: {
                        id: {
                            type:
                                SwaggerDefinitionConstant.Model.Property.Type
                                    .STRING,
                            required: true,
                        },
                        name: {
                            type:
                                SwaggerDefinitionConstant.Model.Property.Type
                                    .STRING,
                            required: true,
                        },
                        description: {
                            type:
                                SwaggerDefinitionConstant.Model.Property.Type
                                    .STRING,
                        },
                        version: {
                            type:
                                SwaggerDefinitionConstant.Model.Property.Type
                                    .STRING,
                        },
                    },
                },
            },
            externalDocs: {
                url: 'My url',
            },
        },
    })
);
```

<a name="1.0.0-alpha.4"></a>

# [1.0.0-alpha.4](2018-01-19)

Add keywords for npm.

<a name="1.0.0-alpha.3"></a>

# [1.0.0-alpha.3](2018-01-18)

Complete informations.

<a name="1.0.0-alpha.2"></a>

# [1.0.0-alpha.2](2018-01-18)

Complete informations.

<a name="1.0.0-alpha.1"></a>

# [1.0.0-alpha.1](2018-01-18)

Complete informations.

<a name="1.0.0-alpha.0"></a>

# [1.0.0-alpha.0](2018-01-18)

## Features

### .express(options: ISwaggerExpressOptions)

Example:

```ts
app.use(
    swagger.express({
        definition: {
            setInfo: {
                title: 'My api',
                version: '1.0',
            },
            models: {
                Version: {
                    properties: {
                        id: {
                            type:
                                SwaggerDefinitionConstant.Definition.Property
                                    .Type.STRING,
                            required: true,
                        },
                        name: {
                            type:
                                SwaggerDefinitionConstant.Definition.Property
                                    .Type.STRING,
                            required: true,
                        },
                        description: {
                            type:
                                SwaggerDefinitionConstant.Definition.Property
                                    .Type.STRING,
                        },
                        version: {
                            type:
                                SwaggerDefinitionConstant.Definition.Property
                                    .Type.STRING,
                        },
                    },
                },
            },
        },
    })
);
```

### @ApiPath(args: IApiPathArgs)

Example:

```ts
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ApiPath } from 'swagger-express-ts';
import { controller } from 'inversify-express-utils';

@ApiPath({
    path: '/version',
    name: 'Version',
})
@controller('/version')
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = 'VersionController';
}
```

### @ApiOperationDelete(args: IApiOperationDeleteArgs)

Example:

```ts
import * as express from 'express';
import { injectable } from 'inversify';
import {
    controller,
    interfaces,
    requestParam,
    httpDelete,
} from 'inversify-express-utils';
import {
    ApiPath,
    ApiOperationDelete,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import 'reflect-metadata';

@ApiPath({
    path: '/versions',
    name: 'Version',
})
@controller('/versions')
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = 'VersionController';
    private data: [any] = [
        {
            id: '1',
            name: 'Version 1',
            description: 'Description Version 1',
            version: '1.0.0',
        },
        {
            id: '2',
            name: 'Version 2',
            description: 'Description Version 2',
            version: '2.0.0',
        },
    ];

    @ApiOperationDelete({
        path: '/{id}',
        parameters: {
            path: {
                id: {
                    description: 'Id of version',
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true,
                },
            },
        },
        responses: {
            200: { description: 'Success' },
        },
    })
    @httpDelete('/:id')
    public deleteVersion(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        this.data.forEach((version: any, index: number) => {
            if (version.id === id) {
                this.data.splice(index, 1);
                return response.status(200).end();
            }
        });
        response.status(404).end();
    }
}
```

### @ApiOperationGet(args: IApiOperationGetArgs)

Decorate method for getting a resource in your controller.

Example:

```ts
import * as express from 'express';
import { injectable } from 'inversify';
import {
    controller,
    interfaces,
    requestParam,
    httpGet,
} from 'inversify-express-utils';
import {
    ApiPath,
    ApiOperationGet,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import 'reflect-metadata';

@ApiPath({
    path: '/versions',
    name: 'Version',
})
@controller('/versions')
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = 'VersionController';
    private data: [any] = [
        {
            id: '1',
            name: 'Version 1',
            description: 'Description Version 1',
            version: '1.0.0',
        },
        {
            id: '2',
            name: 'Version 2',
            description: 'Description Version 2',
            version: '2.0.0',
        },
    ];

    @ApiOperationGet({
        description: 'Get version object',
        summary: 'Get version',
        responses: {
            200: { description: 'Success', isArray: true, model: 'Version' },
        },
    })
    @httpGet('/')
    public getVersions(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.data);
    }
}
```

### @ApiOperationPatch(args: IApiOperationPatchArgs)

Decorate method for updating a field of resource in your controller.

Example:

```ts
import * as express from 'express';
import { injectable } from 'inversify';
import {
    controller,
    interfaces,
    requestParam,
    httpPatch,
} from 'inversify-express-utils';
import {
    ApiPath,
    ApiOperationPatch,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import 'reflect-metadata';

@ApiPath({
    path: '/versions',
    name: 'Version',
})
@controller('/versions')
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = 'VersionController';
    private data: [any] = [
        {
            id: '1',
            name: 'Version 1',
            description: 'Description Version 1',
            version: '1.0.0',
        },
        {
            id: '2',
            name: 'Version 2',
            description: 'Description Version 2',
            version: '2.0.0',
        },
    ];

    @ApiOperationPatch({
        path: '/{id}/description',
        description: 'Patch description in version object',
        summary: 'Patch description in version',
        parameters: {
            path: {
                id: {
                    description: 'Id of version',
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true,
                },
            },
            body: {
                description: 'New version',
                required: true,
                model: 'Version',
            },
        },
        responses: {
            200: { description: 'Success' },
            400: { description: 'Parameters fail' },
            404: { description: 'Version not found' },
        },
    })
    @httpPatch('/:id/description')
    public patchVersionDescription(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
            return response.status(400).end();
        }
        this.data.forEach((version: any) => {
            if (version.id === id) {
                version.description = request.body.description;
                return response.json(version);
            }
        });
        response.status(404).end();
    }
}
```

### @ApiOperationPost(args: IApiOperationPostArgs)

Decorate method for create a resource in your controller.

Example:

```ts
import * as express from 'express';
import { injectable } from 'inversify';
import {
    controller,
    interfaces,
    requestParam,
    httpPost,
} from 'inversify-express-utils';
import {
    ApiPath,
    ApiOperationPost,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import 'reflect-metadata';

@ApiPath({
    path: '/versions',
    name: 'Version',
})
@controller('/versions')
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = 'VersionController';
    private data: [any] = [
        {
            id: '1',
            name: 'Version 1',
            description: 'Description Version 1',
            version: '1.0.0',
        },
        {
            id: '2',
            name: 'Version 2',
            description: 'Description Version 2',
            version: '2.0.0',
        },
    ];

    @ApiOperationPost({
        description: 'Post version object',
        summary: 'Post new version',
        parameters: {
            body: {
                description: 'New version',
                required: true,
                model: 'Version',
            },
        },
        responses: {
            200: { description: 'Success' },
            400: { description: 'Parameters fail' },
        },
    })
    @httpPost('/')
    public postVersion(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
            return response.status(400).end();
        }
        this.data.push(request.body);
        response.json(request.body);
    }
}
```

### @ApiOperationPut(args: IApiOperationPutArgs)

Decorate method for updating a resource in your controller.

Example:

```ts
import * as express from 'express';
import { injectable } from 'inversify';
import {
    controller,
    interfaces,
    requestParam,
    httpPut,
} from 'inversify-express-utils';
import {
    ApiPath,
    ApiOperationPut,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import 'reflect-metadata';

@ApiPath({
    path: '/versions',
    name: 'Version',
})
@controller('/versions')
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = 'VersionController';
    private data: [any] = [
        {
            id: '1',
            name: 'Version 1',
            description: 'Description Version 1',
            version: '1.0.0',
        },
        {
            id: '2',
            name: 'Version 2',
            description: 'Description Version 2',
            version: '2.0.0',
        },
    ];

    @ApiOperationPut({
        path: '/{id}',
        parameters: {
            path: {
                id: {
                    description: 'Id of version',
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true,
                },
            },
            body: {
                description: 'Updated version',
                model: 'Version',
                required: true,
            },
        },
        responses: {
            200: { model: 'Version' },
        },
    })
    @httpPut('/:id')
    public putVersion(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
            return response.status(400).end();
        }
        this.data.forEach((version: any, index: number) => {
            if (version.id === id) {
                let newVersion = request.body;
                version.id = newVersion.id;
                version.name = newVersion.name;
                version.description = newVersion.description;
                version.version = newVersion.version;
                this.data[index] = version;
                return response.json(version);
            }
        });
        response.status(404).end();
    }
}
```
