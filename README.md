# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run build && npm start`

Builds and Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

This project uses MongoDB Atlas and uses a secret Key/URI to connect to the database. You can save this key as a .env file with the variable named as REACT_APP_MONGO_KEY.

This application is currently hosted on heroku: https://arcane-ravine-14649.herokuapp.com/

This react app is running on the same port as the backend and we are using Express server to serve static files with the help of the npm run build command.

The project folder structure is 

-backend
	-api
		-users.js (Endpoint for all queries/Crud Operations related to users/accounts)
	-models
		-user.js (Defining the schema for the user object)
	database.js (initializing the database with the mongo URI)
	server.js (initializing the server)

-build
-public
-src
	-App.js (the homepage where all the data is rendering, using react hooks and axios requests to communicate with the backend)
	-index.js
