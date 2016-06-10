# Product Selection
---
SKY technology unattended programming test

This project has backend made with NodeJS, Hapi, and SQLite and frontend with React, Flux and Bootstrap.

## System Requirements
* NodeJS and Google Chrome installed
* So far it is only tested on Mac
## Project Structure
* sky - The project root
    * backend - The backend code
        * index.js - The entry file that is executed to start the server.
        * www - The document root (static content wiil be served from here).
            * index.html - the HTML page that you will see in the browser.
            * js - the JS files (they are compiled by webpack and put here).
                * commons.js - the shared libraries concatenated (and optionaly minified).
                * index.js - the compiled application code (optionaly minified).
        * tests
            * \*.js - tests for the backend
            * coverage.html - coverage report
        * controllers
            * \*.js - These should be the controller files. If they export a method called "register", it will be invoked when the server is starting and the controllers wil be given a chace to create routes and do other things...
        * db
            * db.sqlite - The database file.
            * db.sql - Shows what's in the db (just for reference).
            * index.js - simple abstraction layer for the db operations.
    * frontend
        * src
            * components - The React components.
            * reducer.js - The reducer.
            * actions.js - All the action creators.
            * lib.js - A few shared functions.
            * index.js - The compilation entry point.
        * tests
            * \*.js - tests for the frontend.

## How to run the demo
Clone the repo somewhere and `cd` into the project folder and run `npm install` (this might take some time). Then you can do any of the following:

### How to start and test the project server
To start the server:
```sh
cd backend
node .
```
Then open http://localhost:3210 in your browser and you should see the app.

To enable the Hapi error logging:
```sh
NODE_ENV=development node .
```
To enable all the logging:
```sh
NODE_ENV=development DEBUG="app:*" node .
```
Note that the server will attempt to listen on `0.0.0.0:3210`. If for some reason that
port is not available for you, you can use the `HOST` and `PORT` env vars to specify something else.

To run the backend tests:
```sh
PORT=1234 NODE_ENV="test" npm test
```
This starts it's own server so you only need the `PORT` to prevent conflicts if there is another server running already. After the tests are complete ypu can open the file `/backend/tests/coverage.html` to see the coverage report.

### How to (re)build and test the frontend app
To build for production (minified code and no logs):
```sh
cd {project root}
NODE_ENV=production node ./node_modules/webpack/bin/webpack.js
```
To build for development (code is not minified, flux actions are logged in console, the project is watched for changes and rebuilt automatically):
```sh
cd {project root}
npm run dev
```
To run the frontend tests
```sh
cd {project root}
npm run test:frontend
```
Note: this will run the tests in karma/Chrome in watch mode so you will need to Ctrl+C to exit.
