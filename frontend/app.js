// ~~~~~~~~~~~~~~~~~
// ### VARIABLES ###

// settings
const port = 2000;

// express
const express = require("express");
const app = express();
const path = require("path");
//const session = require('express-session');

// sass variables
const sass = require("node-sass");
const getEntries = require("./webservices/globEntries.js");

// data
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//app.use(session());

// ~~~~~~~~~~~~~~~~~~~~~
// ### CONFIGURATION ###

// -- STYLESHEET HANDLING
let styleStreams = {};
function getSASS() {
    let styles = getEntries("src/sass/*.scss");
    styles.forEach((style) => {
        let stream = {};
        let results = sass.renderSync({
            file: style.path,
            outputStyle: 'compressed'
        })
        stream.file = style.file;
        stream.css = results.css;
        styleStreams[style.name + ".css"] = stream;
    })
}
getSASS();

// -- DEFINE PUBLIC DIRECTORY
// - fonts and images need this
app.set(express.static(path.join(__dirname, "public")));

// -- PASS VARIABLES FOR STYLESHEETS
app.use((req, res, next) => {
    req.streams = styleStreams;
    next();
})

// -- DEFINE TEMPLATE ENGINE
app.set("views", path.join(__dirname, "src"));
app.set("view engine", "pug");


// -- DEFINE ROUTES
const index = require("./index");
app.use("/", index);


// -- INITIATE SERVER
app.listen(port, () => {
    console.log("Server running on port:", port);
})