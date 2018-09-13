import * as bodyParser from "body-parser";
import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import {
  interfaces,
  InversifyExpressServer,
  TYPE
} from "inversify-express-utils";
import { VersionsController } from "./version/versions.controller";
import * as swagger from "./lib/swagger-express-ts";
import { VersionController } from "./version/version.controller";
import { VersionsService } from "./version/versions.service";
import * as _ from "lodash";
// import models
import "./version/version.model";
import "./author/author.model";

// set up container
const container = new Container();

// note that you *must* bind your controllers to Controller
container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(VersionsController)
  .inSingletonScope()
  .whenTargetNamed(VersionsController.TARGET_NAME);
container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(VersionController)
  .inSingletonScope()
  .whenTargetNamed(VersionController.TARGET_NAME);
container
  .bind<VersionsService>(VersionsService.TARGET_NAME)
  .to(VersionsService)
  .inSingletonScope();
// create server
const server = new InversifyExpressServer(container);

server.setConfig((app: any) => {
  app.use("/api-docs/swagger", express.static("swagger"));
  app.use(
    "/api-docs/swagger/assets",
    express.static("node_modules/swagger-ui-dist")
  );
  app.use(bodyParser.json());
  app.use(
    swagger.express({
      definition: {
        info: {
          title: "My api",
          version: "1.0"
        },
        models: {
          //    Version : {
          //        properties : {
          //            id : {
          //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
          //                required : true
          //            },
          //            name : {
          //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
          //                required : true
          //            },
          //            description : {
          //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING
          //            },
          //            version : {
          //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING
          //            },
          //            author: {
          //                model: "Author"
          //            }
          //        }
          //    },
          // Author: {
          //   properties: {
          //     id: {
          //       description: "Id of author",
          //       type: SwaggerDefinitionConstant.Model.Property.Type.STRING,
          //       required: true
          //     },
          //     name: {
          //       description: "Name of author",
          //       type: SwaggerDefinitionConstant.Model.Property.Type.ARRAY,
          //       itemType:
          //         SwaggerDefinitionConstant.Model.Property.ItemType.STRING,
          //       required: true
          //     }
          //   }
          // }
        },
        responses: {
          500: {}
        },
        externalDocs: {
          url: "My url"
        },
        securityDefinitions: {
          apiKeyHeader: {
            type: swagger.SwaggerDefinitionConstant.Security.Type.API_KEY,
            in: swagger.SwaggerDefinitionConstant.Security.In.HEADER,
            name: "apiHeader"
          }
        }
      }
    })
  );
});

server.setErrorConfig((app: any) => {
  app.use(
    (
      err: Error,
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      response.status(500).send("Something broke!");
      next(err);
    }
  );
});

const app = server.build();

if (!_.isEqual(process.env.NODE_ENV, "test")) {
  const port = 9001;
  app.listen(port);
  console.info("Server is listening on port : " + port);
}
