////////////////////////////
// Dependencies
////////////////////////////
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const pokemon = require('./models/pokemon.js');




////////////////////////////
// Application Object
////////////////////////////
const app = express();


//////////////////////////////
// Middleware
//////////////////////////////
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use("/static", express.static("public"));

//////////////////////////////
// Routes and Routers
//////////////////////////////

// Landing Route
app.get("/", (req, res) => {
    res.render('landing.ejs')
});

// Index Route
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { 
        pokemon: pokemon,
    });
});

// New Route 
app.get("/pokemon/new", (req, res) => {
    res.render('new.ejs', {
        pokemon: pokemon,
    });        
});

// Destroy - Delete Route
app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1);
    res.redirect("/pokemon");
});    

// Update Route
app.put('/pokemon/:id', (req, res) => {
    pokemon[req.params.id] = req.body;
    res.redirect("/pokemon");
    console.log(req.body);
});

// Create Route
app.post("/pokemon", (req, res) => {
    pokemon.unshift(req.body);
    res.redirect("/pokemon");
});    

// Edit Route
app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", {
        pokemon: pokemon[req.params.id],
        index: req.params.id
    });
});

// Show Route 
app.get("/pokemon/:id", (req, res) => {
    res.render('show.ejs', { 
        pokemon: pokemon[req.params.id], 
        index: req.params.id,
    });
});


/////////////////////////////
// Server Listener
/////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})




