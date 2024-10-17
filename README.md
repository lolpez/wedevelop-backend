# wedevelop-challenge Backend

This backend project uses:
1. Expressjs as framework
2. TypeScript as language
3. MongoDB as database deployed on Atlas.

## How to install

1. Make sure to have NodeJs on your local environment (LTS version is recommended)
2. Open a terminal inside the project and execute `npm install`
3. Then execute `npm start` in order to start the backend service, you should see two messages to make sure it is running correctly:
```
Successfully connected to database: we_develop
Server started at http://localhost:3001
```
4. The backend service will be running on http://localhost:3001, make sure the port 3001 is free before running.

## How to connect to DB

The database is deployed on [Atlas](https://www.mongodb.com/atlas) and it is a test database so feel free to connect, the credentials are located in `.env` file.

It contains 2 collections: `users` and `messages` and you can see the data directly using MongoDB plugin for VS code or any MongoDB management tool, use the connection string in the credentials file.

Once the challenge is finished the database will be removed.