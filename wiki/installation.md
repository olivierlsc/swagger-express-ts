# Installation

You can get the latest release and the type setDefinitions using npm:

```sh
npm install swagger-express-ts reflect-metadata --save
```

swagger-express-ts requires the experimentalDecorators, emitDecoratorMetadata and lib compilation options in your tsconfig.json file.

```json
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6"],
        "types": ["reflect-metadata", "swagger-express-ts"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```
