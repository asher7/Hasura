# HasuraPratice

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



Install
npm i graphql
npm i -D typescript
npm i -D @graphql-codegen/cli
npm i -D @graphql-codegen/typescript
npm i -D @graphql-codegen/typescript-operations
npm i -D @graphql-codegen/typescript-apollo-angular

Configure the plugin
Create or update your codegen.ts file as follows:

-----------------------------------------------------------------------------------------------------------

codegen.ts

import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://my-graphql-api.com/graphql',
  documents: './src/**/*.ts',
  generates: {
    './graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular']
    }
  }
}
export default config
-----------------------------------------------------------------------------------------------------------

Run the codegen and update your code
Assuming that, as recommended, your package.json has the following script:

-----------------------------------------------------------------------------------------------------------

package.json

{
  "scripts": {
    "generate": "graphql-codegen"
  }
}
Running the following generates the graphql/generated.ts file.

-----------------------------------------------------------------------------------------------------------
NPM inatall
-----------
npm run generate
