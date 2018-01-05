import { ISwagger, IContact, ILicense, IInfo } from "./i-swagger";
export class SwaggerService {
    private static data: ISwagger = {
        basePath: "/",
        openapi : "",
        info : <IInfo>{
            title : "",
            contact : <IContact>{},
            license : <ILicense>{
                name : ""
            },
            version : ""
        },
        paths : []
    };

    public static getData(): any {
        return SwaggerService.data;
    }

    public static setData( data: ISwagger ): any {
        SwaggerService.data = data;
    }

}