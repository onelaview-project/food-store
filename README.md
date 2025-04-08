# Food Store

## Prerequisite

- Node.js 22
- Docker

## Steps to Run App

1. Run `npm install` to install all project dependencies.

2. Run `npm run compose:up` to run _docker-compose.yml_ in _apps/api/_ folder.
   This will run MongoDB and Redis as Docker containers in your local host.

3. Run `npm run seed` to seed data (i.e. project items) into the MongoDB.

4. Run `npm run start:dev`
   This will run both backend API (Nest.js app) and frontend web (Vite/React app) altogether.

Now you should be able to access the web via http://localhost:5173.

Once done, please run `npm run compose:down` to tear down all running Docker compose containers.

## Steps to Run Unit Test

1. Run `npm run test`.
