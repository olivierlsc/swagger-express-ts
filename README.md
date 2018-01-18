# swagger-express-ts
Automatically generate and serve swagger.json

## Getting started
First, install [inversify-express-utils](https://www.npmjs.com/package/inversify-express-utils).

```sh
npm install inversify inversify-express-utils reflect-metadata --save
```

Install [swagger-express-ts](https://github.com/olivierlsc/swagger-express-ts).

```sh
npm install swagger-express-ts --save
```

## The Basics

### Step 1: configure express

```ts
import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { VersionController } from "./version/version.controller";
import * as swagger from "./lib/swagger-specification";
import { SwaggerDefinitionConstant } from "swagger-express-ts";

// set up container
const container = new Container();

// bind your controllers to Controller
container.bind<interfaces.Controller>( TYPE.Controller )
    .to( VersionController ).whenTargetNamed( VersionController.TARGET_NAME );

// create server
const server = new InversifyExpressServer( container );

// configure server
server.setConfig( ( app: any ) => {
    app.use( swagger.express( {
        path: "/api-docs/swagger.json", // Optional. Default is "/api-docs/swagger.json"
        definition : {
            basePath : "/", // Optional. Default is "/"
            info : {
                title : "Mon api",
                version : "1.0",
                contact : {},
                license : {
                    name : ""
                }
            },
            schemes : [ SwaggerDefinitionConstant.Scheme.HTTPS, SwaggerDefinitionConstant.Scheme.HTTP ], // Optional. Default is SwaggerDefinitionConstant.Scheme.HTTP
            produces : [ SwaggerDefinitionConstant.Produce.JSON, SwaggerDefinitionConstant.Produce.XML ], // Optional. Default is SwaggerDefinitionConstant.Produce.JSON
            consumes : [ SwaggerDefinitionConstant.Consume.JSON, SwaggerDefinitionConstant.Consume.XML ] // Optional. Default is SwaggerDefinitionConstant.Produce.JSON,
	    models : { // Optional.
		    Version : {
			properties : {
			    name : {
				type : SwaggerDefinitionConstant.Definition.Property.Type.STRING,
				required : true
			    },
			    description : { type : SwaggerDefinitionConstant.Definition.Property.Type.STRING },
			    version : {
				type : SwaggerDefinitionConstant.Definition.Property.Type.STRING,
				required : true
			    }
			}
		    }
	    }
        }
    } ) );
} );

// configure error
server.setErrorConfig( ( app: any ) => {
    app.use( ( err: Error, request: express.Request, response: express.Response, next: express.NextFunction ) => {
        console.error( err.stack );
        response.status( 500 ).send( "Something broke!" );
    } );
} );

// start server
const app = server.build();
app.listen( 3000 );
console.info( "Server is listening on port : 3000 );

```

### Step 2: Decorate your controllers

```ts
import * as express from "express";
import { injectable } from "inversify";
import { controller, httpGet, interfaces, httpPost } from "inversify-express-utils";
import { ApiPath, ApiOperationGet, ApiOperationPost } from "swagger-express-ts";
import "reflect-metadata";
const pkg = require( "../../package.json" );

@ApiPath( {
    path : "/version",
    name : "Version",
    description : "Everything about version"
} )
@controller( "/version" )
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = "VersionController";

    @ApiOperationGet( {
        description : "Version object",
        summary : "Get version",
	responses : {
            200 : { 
	    description : "Success",
	    definition : "Version"
	    }
        }
    } )
    @httpGet( "/" )
    public getVersions( request: express.Request, response: express.Response, next: express.NextFunction ): void {
        response.json( {
            description : pkg.description,
            name : pkg.name,
            version : pkg.version,
        } );
    }
    
    @ApiOperationPost( {
        description : "Post Version object that need to be",
        summary : "Post Add a new Version",
        parameters : {
            body : { 
	    	description : "New version",
	    	required : true,
	    	definition: "Version"
	    }
        },
        responses : {
            200 : { description : "Success" },
            400 : { description : "Parameters fail" }
        }
    } )
    @httpPost( "/" )
    public postVersion( request: express.Request, response: express.Response, next: express.NextFunction ): void {
        if ( ! request.body ) {
            return response.status( 400 ).end();
        }
        response.json( request.body );
    }
}

```

### Step 3: Test

Start your server and test on url : /api-docs/swagger.json

```json
{
	"basePath": "/",
	"openapi": "",
	"info": {
		"title": "Mon api",
		"version": "1.0",
		"description": "Description de mon API"
	},
	"paths": {
		"/version": {
			"get": {
				"description": "Version object that need to be  2222",
				"summary": "Add a new Version",
				"operationId": "getVersions",
				"produces": [
					"application/json"
				],
				"consumes": [
					"application/json"
				],
				"tags": [
					"Version"
				],
				"parameters": [],
				"responses": {
					"200": {
						"description": "Success",
						"schema": {
							"$ref": "#/definitions/Version"
						}
					}
				}
			},
			"post": {
				"description": "Post Version object that need to be  2222",
				"summary": "Post Add a new Version",
				"operationId": "postVersion",
				"produces": [
					"application/json"
				],
				"consumes": [
					"application/json"
				],
				"tags": [
					"Version"
				],
				"parameters": [
					{
						"name": "body",
						"in": "body",
						"required": true,
						"schema": {
							"$ref": "#/definitions/Version"
						}
					}
				],
				"responses": {
					"200": {
						"description": "Success"
					},
					"400": {
						"description": "Parameters fail"
					}
				}
			}
		}
	},
	"tags": [
		{
			"name": "Version",
			"description": "Everything about version"
		}
	],
	"schemes": [
		"http"
	],
	"produces": [
		"application/json",
		"application/xml"
	],
	"consumes": [
		"application/json",
		"application/xml"
	],
	"definitions": {
		"Version": {
			"type": "object",
			"properties": {
				"name": {
					"type": "string"
				},
				"description": {
					"type": "string"
				},
				"version": {
					"type": "string"
				}
			},
			"required": [
				"name",
				"version"
			]
		}
	},
	"swagger": "2.0"
}
```

## Features and API

- [Installation](./wiki/installation.md)
- [Configuration](./wiki/configuration.md)
- [@ApiPath](./wiki/api-path.decorator.md)
- [@ApiOperationGet](./wiki/api-operation-get.decorator.md)
- [@ApiOperationPost](./wiki/api-operation-post.decorator.md)
- [@ApiOperationPut](./wiki/api-operation-put.decorator.md)
- [@ApiOperationPatch](./wiki/api-operation-patch.decorator.md)
- [@ApiOperationDelete](./wiki/api-operation-delete.decorator.md)
- [Test](./wiki/test.md)

## For any questions, suggestions, or feature requests

[Please file an issue](https://github.com/olivierlsc/swagger-express-ts/issues)!

## License

License under the MIT License (MIT)

Copyright © 2018 [Olivier LIN-SI-CHENG](http://www.olivierlinsicheng.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
