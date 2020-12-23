const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const bodyParser = require('body-parser');
const multer = require('multer');
// const uploadImage = require('./controllers/file.controller')

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

// Allows our Angular application to make HTTP requests to Express application
app.use(cors());


// For file upload 
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 30 * 1024 * 1024, // file upload limit
    },
  })
  app.disable('x-powered-by')
  app.use(multerMid.single('file'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Where Angular builds to - In the ./angular/angular.json file, you will find this configuration
// at the property: projects.angular.architect.build.options.outputPath
// When you run `ng build`, the output will go to the ./public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:8080
app.listen(8080);
