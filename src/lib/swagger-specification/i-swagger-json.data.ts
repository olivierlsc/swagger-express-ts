export interface ISwaggerJson {
    basePath: string;
    externalDocs: {description: string, url: string};
    host: string;
    info: {
        contact: { email: string},
        description: string,
        licence: {name: string, url: string},
        termsOfService: string,
        title: string,
        version: string
    };
    swagger: string;
    tags: [{name: string, description: string}]
}
