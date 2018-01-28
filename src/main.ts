import * as bodyParser from "body-parser";
import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { VersionController } from "./version/version.controller";
import * as swagger from "./lib/swagger-express-ts";
import { SwaggerDefinitionConstant } from "./lib/swagger-express-ts";
const config = require ( "../config.json" );

// set up container
const container = new Container ();

// note that you *must* bind your controllers to Controller
container.bind<interfaces.Controller> ( TYPE.Controller )
    .to( VersionController ).inSingletonScope().whenTargetNamed( VersionController.TARGET_NAME );

// create server
const server = new InversifyExpressServer ( container );

server.setConfig( ( app : any ) => {
    app.use( '/api-docs/swagger' , express.static( 'swagger' ) );
    app.use( '/api-docs/swagger/assets' , express.static( 'node_modules/swagger-ui-dist' ) );
    app.use( bodyParser.json() );
    app.use( swagger.express(
        {
            definition : {
                info : {
                    title : "Mon api" ,
                    version : "1.0"
                } ,
                models : {
                    Version : {
                        properties : {
                            id : {
                                type : SwaggerDefinitionConstant.Definition.Property.Type.STRING ,
                                required : true
                            } ,
                            name : {
                                type : SwaggerDefinitionConstant.Definition.Property.Type.STRING ,
                                required : true
                            } ,
                            description : {
                                type : SwaggerDefinitionConstant.Definition.Property.Type.STRING
                            } ,
                            version : {
                                type : SwaggerDefinitionConstant.Definition.Property.Type.STRING
                            }
                        }
                    }
                } ,
                externalDocs : {
                    url : "Mon url"
                }
            }
        }
    ) );
} );

server.setErrorConfig( ( app : any ) => {
    app.use( ( err : Error , request : express.Request , response : express.Response , next : express.NextFunction ) => {
        console.error( err.stack );
        response.status( 500 ).send( "Something broke!" );
    } );
} );

const app = server.build();

app.listen( config.port );
console.info( "Server is listening on port : " + config.port );
