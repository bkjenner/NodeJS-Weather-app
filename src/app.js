const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
 
const app = express();

// Define paths for Express config
// Lesson 50
// Setup static directory to serve
// When a route is entered express does the following
// First it looks for files in the public folder (because of the name above)
// Then it looks at each of the routes below
// '' is the root
// '/about'
// '/help'
// '/weather'
// '/help/*' causes it to look at routes below help
// '*' is everything else.
// It does it in order so if you put the * first, it would do that one first

const publicDirectoryPath = path.join(__dirname, "../public");

// Defines the path for handlebar views (HBS)
const viewsPath = path.join(__dirname, "../templates/views");

// Defines the path for Partials.  Partials can be insert into regular hbs views with a ">"
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");

// This sets the path for HBS views
app.set("views", viewsPath);
// This sets the path for HBS partial views
hbs.registerPartials(partialsPath);

// Setup static directory to serve.  See note above
app.use(express.static(publicDirectoryPath));

//  The variables defined here are pass to the HBS view
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Blair Kjenner",
  });
});

//  The variables defined here are pass to the HBS view
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Blair Kjenner",
  });
});

//  The variables defined here are pass to the HBS view
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Blair Kjenner",
  });
});

// query strings - try http://localhost:3000/weather?address=Phoenix and see what comes through to query
app.get("/weather", (req, res) => {
  // Checks if a address parameter has been entered
  if (!req.query.address) {
    res.send({ error: "You must provide an address" });
    // instead of else we could have gone "return res.send({..." above
  } else {
    // I add in "= {}"" after { latitude, longitude, location }.  I did this to setup a default so I dont get
    // a deconstruct error
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: "You must provide an address" });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error: error });
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        });
      });
    });
  }

  //   {
  //     console.log(req.query.address);
  //     res.send({
  //         forecast: "It is snowing",
  //         location: req.query.address,
  //       });
  //       }
});

// If someone enters /help/xxx this would get fired
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Blair Kjenner",
    errorMessage: "Help article not found.",
  });
});

// query strings - try http://localhost:3000/products?search=games&rating=5 and see what comes through to query
app.get("/products", (req, res) => {
  // Checks if a search parameter has been entered
  if (!req.query.search) {
    res.send({ error: "You must provide a search term" });
    // instead of else we could have gone "return res.send({..." above
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

// If someone enters /xxx this would get fired.  If we put this
// first in the list it would get fired no matter what route was entered
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Blair Kjenner",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
