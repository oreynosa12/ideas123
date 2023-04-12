const express = require("express");
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')
const path = require("path");
const fs = require("fs");
const util = require("util");
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static("public"));

app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
