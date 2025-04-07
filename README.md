# Food Store

## Steps to Run App
1. Run `npm install`.
2. Run `docker compose up`. This will run MongoDB and Redis in local host.
3. Run `npm run seed`. This will seed products data into MongoDB and it's required to run once.
4. Run `npm run start:dev`. This will run both backend API (Nest.js app) and frontend web (Vite/React app) altogether.

Now you should be able to access the web via http://localhost:5173

## Steps to Run Unit Test
1. Run `npm run test`.
