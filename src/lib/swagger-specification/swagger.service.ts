export class SwaggerService {
    private static data: any = {
        toto : "titi"
    };

    public static getData(): any {
        return SwaggerService.data;
    }

    public static setData( data: any ): void {
        SwaggerService.data = data;
    }
}