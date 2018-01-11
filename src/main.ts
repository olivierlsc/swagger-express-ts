import * as bodyParser from "body-parser";
import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { VersionController } from "./version/version.controller";
import * as compression from "compression";
import * as helmet from "helmet";
import * as swagger from "./lib/swagger-specification";
import { SwaggerDefinition } from "./lib/swagger-specification";
import { BooksController } from "./books/books.controller";
const config = require( "../config.json" );

// set up container
const container = new Container();

// note that you *must* bind your controllers to Controller
container.bind<interfaces.Controller>( TYPE.Controller )
    .to( VersionController ).whenTargetNamed( VersionController.TARGET_NAME );
container.bind<interfaces.Controller>( TYPE.Controller )
    .to( BooksController ).whenTargetNamed( BooksController.TARGET_NAME );
// container.bind<FooService>('FooService').to(FooService);

// create server
const server = new InversifyExpressServer( container );

server.setConfig( ( app: any ) => {
    app.use( '/api-docs/swagger', express.static( 'swagger' ) );
    app.use( '/api-docs/swagger/assets', express.static( 'node_modules/swagger-ui-dist' ) );
    // add body parser
    app.use( bodyParser.urlencoded( {
        extended : true,
    } ) );
    app.use( bodyParser.json() );
    app.use( compression() );
    app.use( helmet() );
    app.use( swagger.express(
        {
            definition : {
                //host: "localhost:3000",
                //basePath : "/v2",
                info : {
                    title : "Mon api",
                    version : "1.0",
                    description : "Description de mon API"
                    // contact : {},
                    // license : {
                    //     name : ""
                    // }
                },
                //schemes : [ SwaggerDefinition.Scheme.HTTPS, SwaggerDefinition.Scheme.HTTP ],
                produces : [ SwaggerDefinition.Produce.JSON, SwaggerDefinition.Produce.XML ],
                consumes : [ SwaggerDefinition.Consume.JSON, SwaggerDefinition.Consume.XML ]
            }
        }
    ) );
} );

server.setErrorConfig( ( app: any ) => {
    app.use( ( err: Error, request: express.Request, response: express.Response, next: express.NextFunction ) => {
        console.error( err.stack );
        response.status( 500 ).send( "Something broke!" );
    } );
} );

const app = server.build();
app.listen( config.port );
console.info( "Server is listening on port : " + config.port );
