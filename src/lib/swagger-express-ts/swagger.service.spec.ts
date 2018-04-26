import { SwaggerService } from "./swagger.service";
import * as chai from "chai";
import {
  ISwaggerExternalDocs,
  ISwaggerInfo,
  ISwaggerDefinition,
  ISwaggerDefinitionProperty,
  ISwaggerPath
} from "./i-swagger";
import { IApiPathArgs } from "./api-path.decorator";
import { IApiOperationGetArgs } from "./api-operation-get.decorator";
import { IApiOperationPostArgs } from "./api-operation-post.decorator";
import { IApiOperationPutArgs } from "./api-operation-put.decorator";
import { IApiOperationPatchArgs } from "./api-operation-patch.decorator";
import { IApiOperationDeleteArgs } from "./api-operation-delete.decorator";
import { SwaggerDefinitionConstant } from "./swagger-definition.constant";
import { ISwaggerBuildDefinitionModel } from "./swagger.builder";
const expect = chai.expect;

describe("SwaggerService", () => {
  beforeEach(() => {
    SwaggerService.getInstance().resetData();
    console.log("reset");
  });

  describe("setBasePath", () => {
    it('expect basePath default "/"', () => {
      expect(SwaggerService.getInstance().getData().basePath).to.equal("/");
    });

    it("expect basePath exist when it setted", () => {
      let basePath = "/basepath";

      SwaggerService.getInstance().setBasePath(basePath);

      expect(SwaggerService.getInstance().getData().basePath).to.equal(
        basePath
      );
    });
  });

  describe("setOpenapi", () => {
    it("expect default openapi when it not setted", () => {
      expect(SwaggerService.getInstance().getData().openapi).to.not.exist;
    });

    it("expect openapi exist when it setted", () => {
      let openapi = "openapi";

      SwaggerService.getInstance().setOpenapi(openapi);

      expect(SwaggerService.getInstance().getData().openapi).to.equal(openapi);
    });
  });

  describe("setInfo", () => {
    it("expect default info", () => {
      expect(SwaggerService.getInstance().getData().info.title).to.equal("");
      expect(SwaggerService.getInstance().getData().info.version).to.equal("");
    });

    it("expect info when it defined", () => {
      let info: ISwaggerInfo = {
        title: "Title",
        version: "1.0.1"
      };

      SwaggerService.getInstance().setInfo(info);

      expect(SwaggerService.getInstance().getData().info.title).to.equal(
        info.title
      );
      expect(SwaggerService.getInstance().getData().info.version).to.equal(
        info.version
      );
    });
  });

  describe("setSchemes", () => {
    it("expect default schemes when it not defined", () => {
      expect(SwaggerService.getInstance().getData().schemes)
        .to.have.lengthOf(1)
        .to.have.members([SwaggerDefinitionConstant.Scheme.HTTP]);
    });

    it("expect schemes when it defined", () => {
      let schemes: string[] = [
        SwaggerDefinitionConstant.Scheme.HTTP,
        SwaggerDefinitionConstant.Scheme.HTTPS
      ];

      SwaggerService.getInstance().setSchemes(schemes);

      expect(SwaggerService.getInstance().getData().schemes).to.deep.equal(
        schemes
      );
    });
  });

  describe("setExternalDocs", () => {
    it("expect default externalDocs when it not defined", () => {
      expect(SwaggerService.getInstance().getData().externalDocs).to.not.exist;
    });

    it("expect externalDocs when it defined", () => {
      let externalDocs: ISwaggerExternalDocs = {
        url: "Mon url"
      };

      SwaggerService.getInstance().setExternalDocs(externalDocs);

      expect(SwaggerService.getInstance().getData().externalDocs.url).to.equal(
        externalDocs.url
      );
    });
  });

  describe("setProduces", () => {
    it("expect default produces when it not defined", () => {
      expect(SwaggerService.getInstance().getData().produces)
        .to.have.lengthOf(1)
        .to.have.members([SwaggerDefinitionConstant.Produce.JSON]);
    });

    it("expect produces when it defined", () => {
      let produces: string[] = [
        SwaggerDefinitionConstant.Produce.JSON,
        SwaggerDefinitionConstant.Produce.XML
      ];

      SwaggerService.getInstance().setProduces(produces);

      expect(SwaggerService.getInstance().getData().produces).to.deep.equal(
        produces
      );
    });
  });

  describe("setConsumes", () => {
    it("expect default consumes when it not defined", () => {
      expect(SwaggerService.getInstance().getData().consumes)
        .to.have.lengthOf(1)
        .to.have.members([SwaggerDefinitionConstant.Consume.JSON]);
    });

    it("expect consumes when it defined", () => {
      let consumes: string[] = [
        SwaggerDefinitionConstant.Consume.JSON,
        SwaggerDefinitionConstant.Consume.XML
      ];

      SwaggerService.getInstance().setConsumes(consumes);

      expect(SwaggerService.getInstance().getData().consumes).to.deep.equal(
        consumes
      );
    });
  });

  describe("setHost", () => {
    it("expect host not exist when it not defined", () => {
      expect(SwaggerService.getInstance().getData().host).to.be.not.exist;
    });

    it("expect host when it defined", () => {
      let host: string = "host";

      SwaggerService.getInstance().setHost(host);

      expect(SwaggerService.getInstance().getData().host).to.equal(host);
    });
  });

  describe("setDefinitions", () => {
    it("expect default definitions when they not defined", () => {
      expect(SwaggerService.getInstance().getData().definitions).to.deep.equal(
        {}
      );
    });

    it("expect definitions when they defined", () => {
      let models: { [key: string]: ISwaggerBuildDefinitionModel } = {
        Version: {
          properties: {
            id: <ISwaggerDefinitionProperty>{
              type: SwaggerDefinitionConstant.Model.Property.Type.STRING
            }
          }
        }
      };

      SwaggerService.getInstance().setDefinitions(models);

      expect(SwaggerService.getInstance().getData().definitions).to.deep.equal({
        Version: {
          properties: {
            id: { type: "string" }
          },
          required: [],
          type: "object"
        }
      });
    });
  });

  describe("addPath", () => {
    it("expect new path", () => {
      let args: IApiPathArgs = {
        path: "/versions",
        name: "version"
      };
      let target: any = {
        name: "MyName"
      };

      SwaggerService.getInstance().addPath(args, target);

      SwaggerService.getInstance().buildSwagger();
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal({
        "/versions": {}
      });
    });
  });

  describe("addOperationGet", () => {
    let pathArgs: IApiPathArgs = {
      path: "/versions",
      name: "Version"
    };
    let pathTarget: any = {
      name: "VersionsController"
    };
    let operationGetTarget: any = {
      constructor: {
        name: "VersionsController"
      }
    };
    let propertyKey: string | symbol;
    let expectedPaths: { [key: string]: ISwaggerPath };

    beforeEach(() => {
      SwaggerService.getInstance().addPath(pathArgs, pathTarget);
    });

    describe("expect array", () => {
      beforeEach(() => {
        propertyKey = "getVersions";
        expectedPaths = {
          "/versions": {
            get: {
              consumes: [SwaggerDefinitionConstant.Consume.JSON],
              operationId: "getVersions",
              produces: [SwaggerDefinitionConstant.Produce.JSON],
              responses: {
                200: {
                  description: "Success",
                  schema: {
                    items: { $ref: "#/definitions/Version" },
                    type: SwaggerDefinitionConstant.Response.Type.ARRAY
                  }
                }
              },
              tags: ["Version"]
            }
          }
        };
      });

      it("expect default", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          responses: {
            200: {
              model: "Version",
              type: SwaggerDefinitionConstant.Response.Type.ARRAY
            }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect description", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          description: "get versions",
          responses: {
            200: {
              model: "Version",
              type: SwaggerDefinitionConstant.Response.Type.ARRAY
            }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions"].get.description =
          operationGetArgs.description;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect summary", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          summary: "get versions",
          responses: {
            200: {
              model: "Version",
              type: SwaggerDefinitionConstant.Response.Type.ARRAY
            }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions"].get.summary = operationGetArgs.summary;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect consumes", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          consumes: [
            SwaggerDefinitionConstant.Consume.JSON,
            SwaggerDefinitionConstant.Consume.XML
          ],
          responses: {
            200: {
              model: "Version",
              type: SwaggerDefinitionConstant.Response.Type.ARRAY
            }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions"].get.consumes = operationGetArgs.consumes;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect produces", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          produces: [
            SwaggerDefinitionConstant.Produce.JSON,
            SwaggerDefinitionConstant.Produce.XML
          ],
          responses: {
            200: {
              model: "Version",
              type: SwaggerDefinitionConstant.Response.Type.ARRAY
            }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions"].get.produces = operationGetArgs.produces;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect responses", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          responses: {
            200: {
              description: "return version object",
              type: SwaggerDefinitionConstant.Response.Type.ARRAY,
              model: "Version"
            }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions"].get.responses[200].description =
          operationGetArgs.responses[200].description;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });
    });

    describe("expect object", () => {
      beforeEach(() => {
        propertyKey = "getVersion";
        expectedPaths = {
          "/versions/{id}": {
            get: {
              consumes: [SwaggerDefinitionConstant.Consume.JSON],
              operationId: "getVersion",
              produces: [SwaggerDefinitionConstant.Produce.JSON],
              responses: {
                200: {
                  description: "Success",
                  schema: {
                    $ref: "#/definitions/Version"
                  }
                }
              },
              tags: ["Version"]
            }
          }
        };
      });

      it("expect default", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          path: "/{id}",
          responses: {
            200: { model: "Version" }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect description", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          path: "/{id}",
          description: "get version",
          responses: {
            200: { model: "Version" }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions/{id}"].get.description =
          operationGetArgs.description;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect summary", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          path: "/{id}",
          summary: "get version",
          responses: {
            200: { model: "Version" }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions/{id}"].get.summary = operationGetArgs.summary;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect consumes", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          path: "/{id}",
          consumes: [
            SwaggerDefinitionConstant.Consume.JSON,
            SwaggerDefinitionConstant.Consume.XML
          ],
          responses: {
            200: { model: "Version" }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions/{id}"].get.consumes =
          operationGetArgs.consumes;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect produces", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          path: "/{id}",
          produces: [
            SwaggerDefinitionConstant.Produce.JSON,
            SwaggerDefinitionConstant.Produce.XML
          ],
          responses: {
            200: { model: "Version" }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions/{id}"].get.produces =
          operationGetArgs.produces;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });

      it("expect responses", () => {
        let operationGetArgs: IApiOperationGetArgs = {
          path: "/{id}",
          responses: {
            200: { description: "return version object", model: "Version" }
          }
        };

        SwaggerService.getInstance().addOperationGet(
          operationGetArgs,
          operationGetTarget,
          propertyKey
        );

        SwaggerService.getInstance().buildSwagger();
        expectedPaths["/versions/{id}"].get.responses[200].description =
          operationGetArgs.responses[200].description;
        expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
          expectedPaths
        );
      });
    });
  });

  describe("addOperationPost", () => {
    let argsPath: IApiPathArgs = {
      path: "/versions",
      name: "Version"
    };
    let targetPath: any = {
      name: "VersionController"
    };
    let targetOperationPost: any = {
      constructor: {
        name: "VersionController"
      }
    };
    let propertyKey: string | symbol = "postVersion";
    let expectedPaths: { [key: string]: ISwaggerPath };

    beforeEach(() => {
      SwaggerService.getInstance().addPath(argsPath, targetPath);
      expectedPaths = {
        "/versions": {
          post: {
            parameters: [
              {
                in: SwaggerDefinitionConstant.Parameter.In.BODY,
                name: SwaggerDefinitionConstant.Parameter.In.BODY,
                required: true,
                schema: {
                  $ref: "#/definitions/Version"
                }
              }
            ],
            consumes: [SwaggerDefinitionConstant.Consume.JSON],
            operationId: propertyKey,
            produces: [SwaggerDefinitionConstant.Produce.JSON],
            responses: {
              200: {
                description: "Success",
                schema: {
                  items: {
                    $ref: "#/definitions/Version"
                  },
                  type: SwaggerDefinitionConstant.Response.Type.ARRAY
                }
              }
            },
            tags: ["Version"]
          }
        }
      };
    });

    it("expect default", () => {
      let argsOperationPost: IApiOperationPostArgs = {
        parameters: {
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: {
            model: "Version",
            type: SwaggerDefinitionConstant.Response.Type.ARRAY
          }
        }
      };

      SwaggerService.getInstance().addOperationPost(
        argsOperationPost,
        targetOperationPost,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect description", () => {
      let argsOperationPost: IApiOperationPostArgs = {
        description: "post version",
        parameters: {
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: {
            model: "Version",
            type: SwaggerDefinitionConstant.Response.Type.ARRAY
          }
        }
      };

      SwaggerService.getInstance().addOperationPost(
        argsOperationPost,
        targetOperationPost,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions"].post.description =
        argsOperationPost.description;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect summary", () => {
      let argsOperationPost: IApiOperationPostArgs = {
        summary: "post version",
        parameters: {
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: {
            model: "Version",
            type: SwaggerDefinitionConstant.Response.Type.ARRAY
          }
        }
      };

      SwaggerService.getInstance().addOperationPost(
        argsOperationPost,
        targetOperationPost,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions"].post.summary = argsOperationPost.summary;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect consumes", () => {
      let argsOperationPost: IApiOperationPostArgs = {
        consumes: [
          SwaggerDefinitionConstant.Consume.JSON,
          SwaggerDefinitionConstant.Consume.XML
        ],
        parameters: {
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: {
            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
            model: "Version"
          }
        }
      };

      SwaggerService.getInstance().addOperationPost(
        argsOperationPost,
        targetOperationPost,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions"].post.consumes = argsOperationPost.consumes;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect produces", () => {
      let argsOperationPost: IApiOperationPostArgs = {
        produces: [
          SwaggerDefinitionConstant.Consume.JSON,
          SwaggerDefinitionConstant.Consume.XML
        ],
        parameters: {
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: {
            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
            model: "Version"
          }
        }
      };

      SwaggerService.getInstance().addOperationPost(
        argsOperationPost,
        targetOperationPost,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions"].post.produces = argsOperationPost.produces;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });
  });

  describe("addOperationPut", () => {
    let argsPath: IApiPathArgs = {
      path: "/versions",
      name: "Version"
    };
    let targetPath: any = {
      name: "VersionController"
    };
    let targetOperationPut: any = {
      constructor: {
        name: "VersionController"
      }
    };
    let propertyKey: string | symbol = "putVersion";
    let expectedPaths: { [key: string]: ISwaggerPath };

    beforeEach(() => {
      SwaggerService.getInstance().addPath(argsPath, targetPath);
      expectedPaths = {
        "/versions/{id}": {
          put: {
            parameters: [
              {
                in: "path",
                description: "Id of version",
                name: "id",
                required: true,
                type: SwaggerDefinitionConstant.Parameter.Type.STRING
              },
              {
                in: SwaggerDefinitionConstant.Parameter.In.BODY,
                name: SwaggerDefinitionConstant.Parameter.In.BODY,
                required: true,
                schema: {
                  $ref: "#/definitions/Version"
                }
              }
            ],
            consumes: [SwaggerDefinitionConstant.Consume.JSON],
            operationId: propertyKey,
            produces: [SwaggerDefinitionConstant.Produce.JSON],
            responses: {
              200: {
                description: "Success",
                schema: {
                  $ref: "#/definitions/Version"
                }
              }
            },
            tags: ["Version"]
          }
        }
      };
    });

    it("expect default", () => {
      let argsOperationPut: IApiOperationPutArgs = {
        path: "/{id}",
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPut(
        argsOperationPut,
        targetOperationPut,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect description", () => {
      let argsOperationPut: IApiOperationPutArgs = {
        path: "/{id}",
        description: "post version",
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPut(
        argsOperationPut,
        targetOperationPut,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}"].put.description =
        argsOperationPut.description;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect summary", () => {
      let argsOperationPut: IApiOperationPutArgs = {
        path: "/{id}",
        summary: "post version",
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPut(
        argsOperationPut,
        targetOperationPut,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}"].put.summary = argsOperationPut.summary;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect consumes", () => {
      let argsOperationPut: IApiOperationPutArgs = {
        path: "/{id}",
        consumes: [
          SwaggerDefinitionConstant.Consume.JSON,
          SwaggerDefinitionConstant.Consume.XML
        ],
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPut(
        argsOperationPut,
        targetOperationPut,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}"].put.consumes = argsOperationPut.consumes;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect produces", () => {
      let argsOperationPut: IApiOperationPutArgs = {
        path: "/{id}",
        produces: [
          SwaggerDefinitionConstant.Consume.JSON,
          SwaggerDefinitionConstant.Consume.XML
        ],
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPut(
        argsOperationPut,
        targetOperationPut,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}"].put.produces = argsOperationPut.produces;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });
  });

  describe("addOperationPatch", () => {
    let argsPath: IApiPathArgs = {
      path: "/versions",
      name: "Version"
    };
    let targetPath: any = {
      name: "VersionController"
    };
    let targetOperationPatch: any = {
      constructor: {
        name: "VersionController"
      }
    };
    let propertyKey: string | symbol = "patchVersionDescription";
    let expectedPaths: { [key: string]: ISwaggerPath };

    beforeEach(() => {
      SwaggerService.getInstance().addPath(argsPath, targetPath);
      expectedPaths = {
        "/versions/{id}/description": {
          patch: {
            parameters: [
              {
                in: "path",
                description: "Id of version",
                name: "id",
                required: true,
                type: SwaggerDefinitionConstant.Parameter.Type.STRING
              },
              {
                in: SwaggerDefinitionConstant.Parameter.In.BODY,
                name: SwaggerDefinitionConstant.Parameter.In.BODY,
                required: true,
                schema: {
                  $ref: "#/definitions/Version"
                }
              }
            ],
            consumes: [SwaggerDefinitionConstant.Consume.JSON],
            operationId: propertyKey,
            produces: [SwaggerDefinitionConstant.Produce.JSON],
            responses: {
              200: {
                description: "Success",
                schema: {
                  $ref: "#/definitions/Version"
                }
              }
            },
            tags: ["Version"]
          }
        }
      };
    });

    it("expect default", () => {
      let argsOperationPatch: IApiOperationPatchArgs = {
        path: "/{id}/description",
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPatch(
        argsOperationPatch,
        targetOperationPatch,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect description", () => {
      let argsOperationPatch: IApiOperationPutArgs = {
        path: "/{id}/description",
        description: "patch version description",
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPatch(
        argsOperationPatch,
        targetOperationPatch,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}/description"].patch.description =
        argsOperationPatch.description;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect summary", () => {
      let argsOperationPatch: IApiOperationPatchArgs = {
        path: "/{id}/description",
        summary: "patch version description",
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPatch(
        argsOperationPatch,
        targetOperationPatch,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}/description"].patch.summary =
        argsOperationPatch.summary;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect consumes", () => {
      let argsOperationPatch: IApiOperationPatchArgs = {
        path: "/{id}/description",
        consumes: [
          SwaggerDefinitionConstant.Consume.JSON,
          SwaggerDefinitionConstant.Consume.XML
        ],
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPatch(
        argsOperationPatch,
        targetOperationPatch,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}/description"].patch.consumes =
        argsOperationPatch.consumes;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect produces", () => {
      let argsOperationPut: IApiOperationPutArgs = {
        path: "/{id}/description",
        produces: [
          SwaggerDefinitionConstant.Consume.JSON,
          SwaggerDefinitionConstant.Consume.XML
        ],
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          },
          body: {
            description: "New versions",
            required: true,
            model: "Version"
          }
        },
        responses: {
          200: { model: "Version" }
        }
      };

      SwaggerService.getInstance().addOperationPatch(
        argsOperationPut,
        targetOperationPatch,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}/description"].patch.produces =
        argsOperationPut.produces;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });
  });

  describe("addOperationDelete", () => {
    let argsPath: IApiPathArgs = {
      path: "/versions",
      name: "Version"
    };
    let targetPath: any = {
      name: "VersionController"
    };
    let targetOperationDelete: any = {
      constructor: {
        name: "VersionController"
      }
    };
    let propertyKey: string | symbol = "deleteVersion";
    let expectedPaths: { [key: string]: ISwaggerPath };

    beforeEach(() => {
      SwaggerService.getInstance().addPath(argsPath, targetPath);
      expectedPaths = {
        "/versions/{id}": {
          delete: {
            consumes: [SwaggerDefinitionConstant.Consume.JSON],
            operationId: propertyKey,
            parameters: [
              {
                in: "path",
                description: "Id of version",
                name: "id",
                required: true,
                type: SwaggerDefinitionConstant.Parameter.Type.STRING
              }
            ],
            produces: [SwaggerDefinitionConstant.Produce.JSON],
            responses: {
              200: {
                description: "Success"
              }
            },
            tags: ["Version"]
          }
        }
      };
    });

    it("expect default", () => {
      let argsOperationDelete: IApiOperationDeleteArgs = {
        path: "/{id}",
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          }
        },
        responses: {
          200: { description: "Success" }
        }
      };

      SwaggerService.getInstance().addOperationDelete(
        argsOperationDelete,
        targetOperationDelete,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect description", () => {
      let argsOperationDelete: IApiOperationDeleteArgs = {
        path: "/{id}",
        description: "delete version",
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          }
        },
        responses: {
          200: { description: "Success" }
        }
      };

      SwaggerService.getInstance().addOperationDelete(
        argsOperationDelete,
        targetOperationDelete,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}"].delete.description =
        argsOperationDelete.description;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect summary", () => {
      let argsOperationDelete: IApiOperationDeleteArgs = {
        path: "/{id}",
        summary: "delete version",
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          }
        },
        responses: {
          200: { description: "Success" }
        }
      };

      SwaggerService.getInstance().addOperationDelete(
        argsOperationDelete,
        targetOperationDelete,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}"].delete.summary =
        argsOperationDelete.summary;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect consumes", () => {
      let argsOperationDelete: IApiOperationDeleteArgs = {
        path: "/{id}",
        consumes: [
          SwaggerDefinitionConstant.Consume.JSON,
          SwaggerDefinitionConstant.Consume.XML
        ],
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          }
        },
        responses: {
          200: { description: "Success" }
        }
      };

      SwaggerService.getInstance().addOperationDelete(
        argsOperationDelete,
        targetOperationDelete,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}"].delete.consumes =
        argsOperationDelete.consumes;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });

    it("expect produces", () => {
      let argsOperationDelete: IApiOperationDeleteArgs = {
        path: "/{id}",
        produces: [
          SwaggerDefinitionConstant.Consume.JSON,
          SwaggerDefinitionConstant.Consume.XML
        ],
        parameters: {
          path: {
            id: {
              description: "Id of version",
              type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              required: true
            }
          }
        },
        responses: {
          200: { description: "Success" }
        }
      };

      SwaggerService.getInstance().addOperationDelete(
        argsOperationDelete,
        targetOperationDelete,
        propertyKey
      );

      SwaggerService.getInstance().buildSwagger();
      expectedPaths["/versions/{id}"].delete.produces =
        argsOperationDelete.produces;
      expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
        expectedPaths
      );
    });
  });
});
