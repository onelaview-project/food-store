# Food Store

## Prerequisite

- Node.js 22
- Docker

## Steps to Run App

At the repository root folder,

1. Run `npm install` to install all project dependencies.

2. Run `npm run compose:up` to run Docker compose from _apps/api/docker-compose.yml_.
   This will run MongoDB and Redis as Docker containers in your local machine.

3. Run `npm run seed` to seed data (i.e. product items and discount campaign) into the MongoDB.

4. Run `npm run start:dev`
   This will run both backend API (Nest.js app) and frontend web (Vite/React app) altogether.

Now you should be able to access the web via http://localhost:5173.

Once done, please run `npm run compose:down` to tear down all running Docker compose containers.

## Steps to Run Unit Test

1. Run `npm run test`.
   This will run all unit tests in the backend project (i.e. _apps/api/_). No unit test is available in the frontend project yet.

   *Note:* If you want to see unit test results printed out in a Given/When/Then style,
         you can run:
         
         npm run test --workspace=apps/api -- --verbose


## Noteworthy

Please note that there is *.env* files in the */apps/api/* and */apps/web/* for configuration. Practically, this file should not be committed in the repository. However, for help running the app easily, I decided to commit it into the repository.
