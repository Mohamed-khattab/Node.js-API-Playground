if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// Importing Libraies that we installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
// Initialize Passport
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  );
  
  const users = [];
  
  // Middleware and configurations
  app.use(express.urlencoded({ extended: false }));
  app.use(flash());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride("_method"));
  
  // Login post route
  app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }));
  
  // Register post route
  app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Create a new user and store in the users array
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
  
      console.log(users); // Display newly registered user in the console
  
      res.redirect("/login");
    } catch (e) {
      console.log(e);
      res.redirect("/register");
    }
  });
  
// Home route
app.get('/', checkAuthenticated, (req, res) => {
    // Render the index.ejs template with the user's name
    res.render("index.ejs", { name: req.user.name });
  });
  
  // Login route
  app.get('/login', checkNotAuthenticated, (req, res) => {
    // Render the login.ejs template
    res.render("login.ejs");
  });
  
  // Register route
  app.get('/register', checkNotAuthenticated, (req, res) => {
    // Render the register.ejs template
    res.render("register.ejs");
  });
  
  // Logout route
  app.delete("/logout", (req, res) => {
    // Logout the user and redirect to the home page
    req.logout(req.user, err => {
      if (err) return next(err);
      res.redirect("/");
    });
  });
  
  // End Routes
  
  // Middleware function to check if the user is authenticated
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // User is authenticated, move to the next middleware
      return next();
    }
    // User is not authenticated, redirect to the login page
    res.redirect("/login");
  }
  
  // Middleware function to check if the user is not authenticated
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // User is authenticated, redirect to the home page
      return res.redirect("/");
    }
    // User is not authenticated, move to the next middleware
    next();
  }
  
  // Start the server
  app.listen(3000);
  