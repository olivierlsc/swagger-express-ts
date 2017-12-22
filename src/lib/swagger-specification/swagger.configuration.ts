export class SwaggerConfiguration {
    private static swaggerData: any = {
        openapi : "",
        info : {}
    };

    /**
     * SetBasePath
     * @param basePath, default is "/"
     */
    public static setBasePath( basePath: string = "/" ): void {
        SwaggerConfiguration.swaggerData.basePath = basePath;
    }

}