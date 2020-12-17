const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
var Router = express.Router()

require('./database');

app.use(bodyParser.json());
app.use(cors());

// API
const users = require('./api/users');

// app.use(function(req, res, next) {
// 	res.setHeader("Content-Type", "application/json");
// 	next();
// });

app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../build')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});