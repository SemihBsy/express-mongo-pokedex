////////////////////////////
// Dependencies
////////////////////////////
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const pokemon = require('./models/pokemon.js')
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};


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
        colors: colors  
    });
});


// New Route 
app.get("/pokemon/new", (req, res) => {
    res.render('new.ejs')
        pokemon: pokemon
    });

// Update Route
app.put('/pokemon/:id', (req, res) => {
    
})

// Create Route
app.post("/pokemon", (req, res) => {
    pokemon.push(req.body);
    res.redirect("/pokemon");
})    



// Show Route 
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { 
        pokemon: pokemon[req.params.id], 
        index: req.params.id 
    });
});


/////////////////////////////
// Server Listener
/////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})




