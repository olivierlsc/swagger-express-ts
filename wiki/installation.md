# Installation

You can get the latest release and the type definitions using npm:

```sh
npm install swagger-express-ts reflect-metadata --save
```

The InversifyJS type definitions are included in the inversify npm package. 
InversifyJS requires the experimentalDecorators, emitDecoratorMetadataand lib compilation options in your tsconfig.json file.

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
