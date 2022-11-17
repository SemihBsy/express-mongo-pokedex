////////////////////////////
// Dependencies
////////////////////////////
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const Pokemon = require('./models/pokemon.js')


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
app.get("/", (req, res) => {
    res.render('landing.ejs')
});

app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { data: Pokemon });
});


// new route 
// app.get("/pokemon/new", (req, res) => {
//     res.render('new.ejs')
//     });


// create route
// app.post("/pokemon", (req, res) => {
//     pokemon.push(req.body);
//     res.redirect("/pokemon");
// })    



// show route 
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { data: Pokemon[req.params.id] });
    });


/////////////////////////////
// Server Listener
/////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})




