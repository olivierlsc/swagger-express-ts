import { SwaggerService } from './swagger.service';
import * as chai from 'chai';
import {
    ISwaggerExternalDocs,
    ISwaggerInfo,
    ISwaggerDefinition,
    ISwaggerDefinitionProperty,
    ISwaggerPath,
} from './i-swagger';
import { IApiPathArgs } from './api-path.decorator';
import { IApiOperationGetArgs } from './api-operation-get.decorator';
import { IApiOperationPostArgs } from './api-operation-post.decorator';
import { IApiOperationPutArgs } from './api-operation-put.decorator';
import { IApiOperationPatchArgs } from './api-operation-patch.decorator';
import { IApiOperationDeleteArgs } from './api-operation-delete.decorator';
import { SwaggerDefinitionConstant } from './swagger-definition.constant';
import { ISwaggerBuildDefinitionModel } from './swagger.builder';
const expect = chai.expect;

describe('SwaggerService', () => {
    beforeEach(() => {
        SwaggerService.getInstance().resetData();
        console.log('reset');
    });

    describe('setBasePath', () => {
        it('expect basePath default "/"', () => {
            expect(SwaggerService.getInstance().getData().basePath).to.equal(
                '/'
            );
        });

        it('expect basePath exist when it setted', () => {
            const basePath = '/basepath';

            SwaggerService.getInstance().setBasePath(basePath);

            expect(SwaggerService.getInstance().getData().basePath).to.equal(
                basePath
            );
        });
    });

    describe('setOpenapi', () => {
        it('expect default openapi when it not setted', () => {
            expect(SwaggerService.getInstance().getData().openapi).to.not.exist;
        });

        it('expect openapi exist when it setted', () => {
            const openapi = 'openapi';

            SwaggerService.getInstance().setOpenapi(openapi);

            expect(SwaggerService.getInstance().getData().openapi).to.equal(
                openapi
            );
        });
    });

    describe('setInfo', () => {
        it('expect default info', () => {
            expect(SwaggerService.getInstance().getData().info.title).to.equal(
                ''
            );
            expect(
                SwaggerService.getInstance().getData().info.version
            ).to.equal('');
        });

        it('expect info when it defined', () => {
            const info: ISwaggerInfo = {
                title: 'Title',
                version: '1.0.1',
            };

            SwaggerService.getInstance().setInfo(info);

            expect(SwaggerService.getInstance().getData().info.title).to.equal(
                info.title
            );
            expect(
                SwaggerService.getInstance().getData().info.version
            ).to.equal(info.version);
        });
    });

    describe('setSchemes', () => {
        it('expect default schemes when it not defined', () => {
            expect(SwaggerService.getInstance().getData().schemes)
                .to.have.lengthOf(1)
                .to.have.members([SwaggerDefinitionConstant.Scheme.HTTP]);
        });

        it('expect schemes when it defined', () => {
            const schemes: string[] = [
                SwaggerDefinitionConstant.Scheme.HTTP,
                SwaggerDefinitionConstant.Scheme.HTTPS,
            ];

            SwaggerService.getInstance().setSchemes(schemes);

            expect(
                SwaggerService.getInstance().getData().schemes
            ).to.deep.equal(schemes);
        });
    });

    describe('setExternalDocs', () => {
        it('expect default externalDocs when it not defined', () => {
            expect(SwaggerService.getInstance().getData().externalDocs).to.not
                .exist;
        });

        it('expect externalDocs when it defined', () => {
            const externalDocs: ISwaggerExternalDocs = {
                url: 'Mon url',
            };

            SwaggerService.getInstance().setExternalDocs(externalDocs);

            expect(
                SwaggerService.getInstance().getData().externalDocs.url
            ).to.equal(externalDocs.url);
        });
    });

    describe('setProduces', () => {
        it('expect default produces when it not defined', () => {
            expect(SwaggerService.getInstance().getData().produces)
                .to.have.lengthOf(1)
                .to.have.members([SwaggerDefinitionConstant.Produce.JSON]);
        });

        it('expect produces when it defined', () => {
            const produces: string[] = [
                SwaggerDefinitionConstant.Produce.JSON,
                SwaggerDefinitionConstant.Produce.XML,
            ];

            SwaggerService.getInstance().setProduces(produces);

            expect(
                SwaggerService.getInstance().getData().produces
            ).to.deep.equal(produces);
        });
    });

    describe('setConsumes', () => {
        it('expect default consumes when it not defined', () => {
            expect(SwaggerService.getInstance().getData().consumes)
                .to.have.lengthOf(1)
                .to.have.members([SwaggerDefinitionConstant.Consume.JSON]);
        });

        it('expect consumes when it defined', () => {
            const consumes: string[] = [
                SwaggerDefinitionConstant.Consume.JSON,
                SwaggerDefinitionConstant.Consume.XML,
            ];

            SwaggerService.getInstance().setConsumes(consumes);

            expect(
                SwaggerService.getInstance().getData().consumes
            ).to.deep.equal(consumes);
        });
    });

    describe('setHost', () => {
        it('expect host not exist when it not defined', () => {
            expect(SwaggerService.getInstance().getData().host).to.be.not.exist;
        });

        it('expect host when it defined', () => {
            const host: string = 'host';

            SwaggerService.getInstance().setHost(host);

            expect(SwaggerService.getInstance().getData().host).to.equal(host);
        });
    });

    describe('setDefinitions', () => {
        it('expect default definitions when they not defined', () => {
            expect(
                SwaggerService.getInstance().getData().definitions
            ).to.deep.equal({});
        });

        it('expect definitions when they defined', () => {
            const models: {
                [key: string]: ISwaggerBuildDefinitionModel;
            } = {
                Version: {
                    properties: {
                        id: {
                            description: 'Id of Version',
                            type:
                                SwaggerDefinitionConstant.Model.Property.Type
                                    .STRING,
                            example: ['123456789'],
                        },
                    },
                },
            };
            SwaggerService.getInstance().setDefinitions(models);

            expect(
                SwaggerService.getInstance().getData().definitions
            ).to.deep.equal({
                Version: {
                    properties: {
                        id: {
                            description: 'Id of Version',
                            example: ['123456789'],
                            type: 'string',
                            enum: undefined,
                            format: undefined,
                        },
                    },
                    required: [],
                    type: 'object',
                },
            });
        });
    });

    describe('addPath', () => {
        it('expect new path', () => {
            const args: IApiPathArgs = {
                path: '/versions',
                name: 'version',
            };
            const target: any = {
                name: 'MyName',
            };

            SwaggerService.getInstance().addPath(args, target);

            SwaggerService.getInstance().buildSwagger();
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal({
                '/versions': {},
            });
        });
    });

    describe('addOperationGet', () => {
        const pathArgs: IApiPathArgs = {
            path: '/versions',
            name: 'Version',
        };
        const pathTarget: any = {
            name: 'VersionsController',
        };
        const operationGetTarget: any = {
            constructor: {
                name: 'VersionsController',
            },
        };
        let propertyKey: string | symbol;
        let expectedPaths: { [key: string]: ISwaggerPath };

        beforeEach(() => {
            SwaggerService.getInstance().addPath(pathArgs, pathTarget);
        });

        describe('expect array', () => {
            beforeEach(() => {
                propertyKey = 'getVersions';
                expectedPaths = {
                    '/versions': {
                        get: {
                            consumes: [SwaggerDefinitionConstant.Consume.JSON],
                            operationId: 'getVersions',
                            produces: [SwaggerDefinitionConstant.Produce.JSON],
                            responses: {
                                200: {
                                    description: 'Success',
                                    schema: {
                                        items: {
                                            $ref: '#/definitions/Version',
                                        },
                                        type:
                                            SwaggerDefinitionConstant.Response
                                                .Type.ARRAY,
                                    },
                                },
                            },
                            tags: ['Version'],
                        },
                    },
                };
            });

            it('expect default', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    responses: {
                        200: {
                            model: 'Version',
                            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                        },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect description', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    description: 'get versions',
                    responses: {
                        200: {
                            model: 'Version',
                            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                        },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions'].get.description =
                    operationGetArgs.description;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect summary', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    summary: 'get versions',
                    responses: {
                        200: {
                            model: 'Version',
                            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                        },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions'].get.summary =
                    operationGetArgs.summary;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect consumes', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    consumes: [
                        SwaggerDefinitionConstant.Consume.JSON,
                        SwaggerDefinitionConstant.Consume.XML,
                    ],
                    responses: {
                        200: {
                            model: 'Version',
                            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                        },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions'].get.consumes =
                    operationGetArgs.consumes;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect produces', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    produces: [
                        SwaggerDefinitionConstant.Produce.JSON,
                        SwaggerDefinitionConstant.Produce.XML,
                    ],
                    responses: {
                        200: {
                            model: 'Version',
                            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                        },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions'].get.produces =
                    operationGetArgs.produces;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect responses', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    responses: {
                        200: {
                            description: 'return version object',
                            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                            model: 'Version',
                        },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions'].get.responses[200].description =
                    operationGetArgs.responses[200].description;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });
        });

        describe('expect object', () => {
            beforeEach(() => {
                propertyKey = 'getVersion';
                expectedPaths = {
                    '/versions/{id}': {
                        get: {
                            consumes: [SwaggerDefinitionConstant.Consume.JSON],
                            operationId: 'getVersion',
                            produces: [SwaggerDefinitionConstant.Produce.JSON],
                            responses: {
                                200: {
                                    description: 'Success',
                                    schema: {
                                        $ref: '#/definitions/Version',
                                    },
                                },
                            },
                            tags: ['Version'],
                        },
                    },
                };
            });

            it('expect default', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    path: '/{id}',
                    responses: {
                        200: { model: 'Version' },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect description', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    path: '/{id}',
                    description: 'get version',
                    responses: {
                        200: { model: 'Version' },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions/{id}'].get.description =
                    operationGetArgs.description;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect summary', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    path: '/{id}',
                    summary: 'get version',
                    responses: {
                        200: { model: 'Version' },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions/{id}'].get.summary =
                    operationGetArgs.summary;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect consumes', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    path: '/{id}',
                    consumes: [
                        SwaggerDefinitionConstant.Consume.JSON,
                        SwaggerDefinitionConstant.Consume.XML,
                    ],
                    responses: {
                        200: { model: 'Version' },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions/{id}'].get.consumes =
                    operationGetArgs.consumes;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect produces', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    path: '/{id}',
                    produces: [
                        SwaggerDefinitionConstant.Produce.JSON,
                        SwaggerDefinitionConstant.Produce.XML,
                    ],
                    responses: {
                        200: { model: 'Version' },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions/{id}'].get.produces =
                    operationGetArgs.produces;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });

            it('expect responses', () => {
                const operationGetArgs: IApiOperationGetArgs = {
                    path: '/{id}',
                    responses: {
                        200: {
                            description: 'return version object',
                            model: 'Version',
                        },
                    },
                };

                SwaggerService.getInstance().addOperationGet(
                    operationGetArgs,
                    operationGetTarget,
                    propertyKey
                );

                SwaggerService.getInstance().buildSwagger();
                expectedPaths['/versions/{id}'].get.responses[200].description =
                    operationGetArgs.responses[200].description;
                expect(
                    SwaggerService.getInstance().getData().paths
                ).to.deep.equal(expectedPaths);
            });
        });
    });

    describe('addOperationPost', () => {
        const argsPath: IApiPathArgs = {
            path: '/versions',
            name: 'Version',
        };
        const targetPath: any = {
            name: 'VersionController',
        };
        const targetOperationPost: any = {
            constructor: {
                name: 'VersionController',
            },
        };
        const propertyKey: string | symbol = 'postVersion';
        let expectedPaths: { [key: string]: ISwaggerPath };

        beforeEach(() => {
            SwaggerService.getInstance().addPath(argsPath, targetPath);
            expectedPaths = {
                '/versions': {
                    post: {
                        parameters: [
                            {
                                allowEmptyValue: undefined,
                                default: undefined,
                                deprecated: undefined,
                                description: 'New versions',
                                format: undefined,
                                maximum: undefined,
                                minimum: undefined,
                                in: SwaggerDefinitionConstant.Parameter.In.BODY,
                                name:
                                    SwaggerDefinitionConstant.Parameter.In.BODY,
                                required: true,
                                schema: {
                                    $ref: '#/definitions/Version',
                                },
                                type: undefined,
                            },
                        ],
                        consumes: [SwaggerDefinitionConstant.Consume.JSON],
                        operationId: propertyKey,
                        produces: [SwaggerDefinitionConstant.Produce.JSON],
                        responses: {
                            200: {
                                description: 'Success',
                                schema: {
                                    items: {
                                        $ref: '#/definitions/Version',
                                    },
                                    type:
                                        SwaggerDefinitionConstant.Response.Type
                                            .ARRAY,
                                },
                            },
                        },
                        tags: ['Version'],
                    },
                },
            };
        });

        it('expect default', () => {
            const argsOperationPost: IApiOperationPostArgs = {
                parameters: {
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: {
                        model: 'Version',
                        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                    },
                },
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

        it('expect description', () => {
            const argsOperationPost: IApiOperationPostArgs = {
                description: 'post version',
                parameters: {
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: {
                        model: 'Version',
                        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                    },
                },
            };

            SwaggerService.getInstance().addOperationPost(
                argsOperationPost,
                targetOperationPost,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions'].post.description =
                argsOperationPost.description;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect summary', () => {
            const argsOperationPost: IApiOperationPostArgs = {
                summary: 'post version',
                parameters: {
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: {
                        model: 'Version',
                        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                    },
                },
            };

            SwaggerService.getInstance().addOperationPost(
                argsOperationPost,
                targetOperationPost,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions'].post.summary = argsOperationPost.summary;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect consumes', () => {
            const argsOperationPost: IApiOperationPostArgs = {
                consumes: [
                    SwaggerDefinitionConstant.Consume.JSON,
                    SwaggerDefinitionConstant.Consume.XML,
                ],
                parameters: {
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: {
                        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                        model: 'Version',
                    },
                },
            };

            SwaggerService.getInstance().addOperationPost(
                argsOperationPost,
                targetOperationPost,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions'].post.consumes =
                argsOperationPost.consumes;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect produces', () => {
            const argsOperationPost: IApiOperationPostArgs = {
                produces: [
                    SwaggerDefinitionConstant.Consume.JSON,
                    SwaggerDefinitionConstant.Consume.XML,
                ],
                parameters: {
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: {
                        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                        model: 'Version',
                    },
                },
            };

            SwaggerService.getInstance().addOperationPost(
                argsOperationPost,
                targetOperationPost,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions'].post.produces =
                argsOperationPost.produces;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });
    });

    describe('addOperationPut', () => {
        const argsPath: IApiPathArgs = {
            path: '/versions',
            name: 'Version',
        };
        const targetPath: any = {
            name: 'VersionController',
        };
        const targetOperationPut: any = {
            constructor: {
                name: 'VersionController',
            },
        };
        const propertyKey: string | symbol = 'putVersion';
        let expectedPaths: { [key: string]: ISwaggerPath };

        beforeEach(() => {
            SwaggerService.getInstance().addPath(argsPath, targetPath);
            expectedPaths = {
                '/versions/{id}': {
                    put: {
                        parameters: [
                            {
                                allowEmptyValue: undefined,
                                default: undefined,
                                deprecated: undefined,
                                in: 'path',
                                format: undefined,
                                description: 'Id of version',
                                maximum: undefined,
                                minimum: undefined,
                                name: 'id',
                                required: true,
                                type:
                                    SwaggerDefinitionConstant.Parameter.Type
                                        .STRING,
                            },
                            {
                                allowEmptyValue: undefined,
                                default: undefined,
                                deprecated: undefined,
                                description: 'New versions',
                                format: undefined,
                                in: SwaggerDefinitionConstant.Parameter.In.BODY,
                                maximum: undefined,
                                minimum: undefined,
                                name:
                                    SwaggerDefinitionConstant.Parameter.In.BODY,
                                required: true,
                                schema: {
                                    $ref: '#/definitions/Version',
                                },
                                type: undefined,
                            },
                        ],
                        consumes: [SwaggerDefinitionConstant.Consume.JSON],
                        operationId: propertyKey,
                        produces: [SwaggerDefinitionConstant.Produce.JSON],
                        responses: {
                            200: {
                                description: 'Success',
                                schema: {
                                    $ref: '#/definitions/Version',
                                },
                            },
                        },
                        tags: ['Version'],
                    },
                },
            };
        });

        it('expect default', () => {
            const argsOperationPut: IApiOperationPutArgs = {
                path: '/{id}',
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
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

        it('expect description', () => {
            const argsOperationPut: IApiOperationPutArgs = {
                path: '/{id}',
                description: 'post version',
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
            };

            SwaggerService.getInstance().addOperationPut(
                argsOperationPut,
                targetOperationPut,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}'].put.description =
                argsOperationPut.description;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect summary', () => {
            const argsOperationPut: IApiOperationPutArgs = {
                path: '/{id}',
                summary: 'post version',
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
            };

            SwaggerService.getInstance().addOperationPut(
                argsOperationPut,
                targetOperationPut,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}'].put.summary =
                argsOperationPut.summary;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect consumes', () => {
            const argsOperationPut: IApiOperationPutArgs = {
                path: '/{id}',
                consumes: [
                    SwaggerDefinitionConstant.Consume.JSON,
                    SwaggerDefinitionConstant.Consume.XML,
                ],
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
            };

            SwaggerService.getInstance().addOperationPut(
                argsOperationPut,
                targetOperationPut,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}'].put.consumes =
                argsOperationPut.consumes;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect produces', () => {
            const argsOperationPut: IApiOperationPutArgs = {
                path: '/{id}',
                produces: [
                    SwaggerDefinitionConstant.Consume.JSON,
                    SwaggerDefinitionConstant.Consume.XML,
                ],
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
            };

            SwaggerService.getInstance().addOperationPut(
                argsOperationPut,
                targetOperationPut,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}'].put.produces =
                argsOperationPut.produces;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });
    });

    describe('addOperationPatch', () => {
        const argsPath: IApiPathArgs = {
            path: '/versions',
            name: 'Version',
        };
        const targetPath: any = {
            name: 'VersionController',
        };
        const targetOperationPatch: any = {
            constructor: {
                name: 'VersionController',
            },
        };
        const propertyKey: string | symbol = 'patchVersionDescription';
        let expectedPaths: { [key: string]: ISwaggerPath };

        beforeEach(() => {
            SwaggerService.getInstance().addPath(argsPath, targetPath);
            expectedPaths = {
                '/versions/{id}/description': {
                    patch: {
                        parameters: [
                            {
                                allowEmptyValue: undefined,
                                default: undefined,
                                deprecated: undefined,
                                in: 'path',
                                maximum: undefined,
                                minimum: undefined,
                                description: 'Id of version',
                                format: undefined,
                                name: 'id',
                                required: true,
                                type:
                                    SwaggerDefinitionConstant.Parameter.Type
                                        .STRING,
                            },
                            {
                                allowEmptyValue: undefined,
                                default: undefined,
                                deprecated: undefined,
                                description: 'New versions',
                                format: undefined,
                                in: SwaggerDefinitionConstant.Parameter.In.BODY,
                                maximum: undefined,
                                minimum: undefined,

                                name:
                                    SwaggerDefinitionConstant.Parameter.In.BODY,
                                required: true,
                                schema: {
                                    $ref: '#/definitions/Version',
                                },
                                type: undefined,
                            },
                        ],
                        consumes: [SwaggerDefinitionConstant.Consume.JSON],
                        operationId: propertyKey,
                        produces: [SwaggerDefinitionConstant.Produce.JSON],
                        responses: {
                            200: {
                                description: 'Success',
                                schema: {
                                    $ref: '#/definitions/Version',
                                },
                            },
                        },
                        tags: ['Version'],
                    },
                },
            };
        });

        it('expect default', () => {
            const argsOperationPatch: IApiOperationPatchArgs = {
                path: '/{id}/description',
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
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

        it('expect description', () => {
            const argsOperationPatch: IApiOperationPutArgs = {
                path: '/{id}/description',
                description: 'patch version description',
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
            };

            SwaggerService.getInstance().addOperationPatch(
                argsOperationPatch,
                targetOperationPatch,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}/description'].patch.description =
                argsOperationPatch.description;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect summary', () => {
            const argsOperationPatch: IApiOperationPatchArgs = {
                path: '/{id}/description',
                summary: 'patch version description',
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
            };

            SwaggerService.getInstance().addOperationPatch(
                argsOperationPatch,
                targetOperationPatch,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}/description'].patch.summary =
                argsOperationPatch.summary;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect consumes', () => {
            const argsOperationPatch: IApiOperationPatchArgs = {
                path: '/{id}/description',
                consumes: [
                    SwaggerDefinitionConstant.Consume.JSON,
                    SwaggerDefinitionConstant.Consume.XML,
                ],
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
            };

            SwaggerService.getInstance().addOperationPatch(
                argsOperationPatch,
                targetOperationPatch,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}/description'].patch.consumes =
                argsOperationPatch.consumes;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect produces', () => {
            const argsOperationPut: IApiOperationPutArgs = {
                path: '/{id}/description',
                produces: [
                    SwaggerDefinitionConstant.Consume.JSON,
                    SwaggerDefinitionConstant.Consume.XML,
                ],
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                    body: {
                        description: 'New versions',
                        required: true,
                        model: 'Version',
                    },
                },
                responses: {
                    200: { model: 'Version' },
                },
            };

            SwaggerService.getInstance().addOperationPatch(
                argsOperationPut,
                targetOperationPatch,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}/description'].patch.produces =
                argsOperationPut.produces;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });
    });

    describe('addOperationDelete', () => {
        const argsPath: IApiPathArgs = {
            path: '/versions',
            name: 'Version',
        };
        const targetPath: any = {
            name: 'VersionController',
        };
        const targetOperationDelete: any = {
            constructor: {
                name: 'VersionController',
            },
        };
        const propertyKey: string | symbol = 'deleteVersion';
        let expectedPaths: { [key: string]: ISwaggerPath };

        beforeEach(() => {
            SwaggerService.getInstance().addPath(argsPath, targetPath);
            expectedPaths = {
                '/versions/{id}': {
                    delete: {
                        consumes: [SwaggerDefinitionConstant.Consume.JSON],
                        operationId: propertyKey,
                        parameters: [
                            {
                                allowEmptyValue: undefined,
                                default: undefined,
                                deprecated: undefined,
                                in: 'path',
                                format: undefined,
                                description: 'Id of version',
                                maximum: undefined,
                                minimum: undefined,
                                name: 'id',
                                required: true,
                                type:
                                    SwaggerDefinitionConstant.Parameter.Type
                                        .STRING,
                            },
                        ],
                        produces: [SwaggerDefinitionConstant.Produce.JSON],
                        responses: {
                            200: {
                                description: 'Success',
                            },
                        },
                        tags: ['Version'],
                    },
                },
            };
        });

        it('expect default', () => {
            const argsOperationDelete: IApiOperationDeleteArgs = {
                path: '/{id}',
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                },
                responses: {
                    200: { description: 'Success' },
                },
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

        it('expect description', () => {
            const argsOperationDelete: IApiOperationDeleteArgs = {
                path: '/{id}',
                description: 'delete version',
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                },
                responses: {
                    200: { description: 'Success' },
                },
            };

            SwaggerService.getInstance().addOperationDelete(
                argsOperationDelete,
                targetOperationDelete,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}'].delete.description =
                argsOperationDelete.description;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect summary', () => {
            const argsOperationDelete: IApiOperationDeleteArgs = {
                path: '/{id}',
                summary: 'delete version',
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                },
                responses: {
                    200: { description: 'Success' },
                },
            };

            SwaggerService.getInstance().addOperationDelete(
                argsOperationDelete,
                targetOperationDelete,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}'].delete.summary =
                argsOperationDelete.summary;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect consumes', () => {
            const argsOperationDelete: IApiOperationDeleteArgs = {
                path: '/{id}',
                consumes: [
                    SwaggerDefinitionConstant.Consume.JSON,
                    SwaggerDefinitionConstant.Consume.XML,
                ],
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                },
                responses: {
                    200: { description: 'Success' },
                },
            };

            SwaggerService.getInstance().addOperationDelete(
                argsOperationDelete,
                targetOperationDelete,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}'].delete.consumes =
                argsOperationDelete.consumes;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });

        it('expect produces', () => {
            const argsOperationDelete: IApiOperationDeleteArgs = {
                path: '/{id}',
                produces: [
                    SwaggerDefinitionConstant.Consume.JSON,
                    SwaggerDefinitionConstant.Consume.XML,
                ],
                parameters: {
                    path: {
                        id: {
                            description: 'Id of version',
                            type:
                                SwaggerDefinitionConstant.Parameter.Type.STRING,
                            required: true,
                        },
                    },
                },
                responses: {
                    200: { description: 'Success' },
                },
            };

            SwaggerService.getInstance().addOperationDelete(
                argsOperationDelete,
                targetOperationDelete,
                propertyKey
            );

            SwaggerService.getInstance().buildSwagger();
            expectedPaths['/versions/{id}'].delete.produces =
                argsOperationDelete.produces;
            expect(SwaggerService.getInstance().getData().paths).to.deep.equal(
                expectedPaths
            );
        });
    });
});
