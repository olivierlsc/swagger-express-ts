# Installation

You can get the latest release and the type setDefinitions using npm:

```sh
npm install swagger-ts-decorators swagger-ui-dist reflect-metadata --save
```

swagger-ts-decorators requires the experimentalDecorators, emitDecoratorMetadata and lib compilation options in your tsconfig.json file.

```json
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6"],
        "types": ["reflect-metadata", "swagger-ts-decorators"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```
