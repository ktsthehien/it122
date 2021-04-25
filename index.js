"use strict"

import * as movie from "./movie.js";
import express from 'express';
import handlebars from "express-handlebars"

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

app.get('/', (req,res) => {
    res.render('home', {movies: movie.getAll()});
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Me: I am Hien Nguyen from Vietnam');
});

// handle GET 


app.get('/detail', (req,res) => {
    console.log(req.query)
    let result = movie.getItem(req.query.name);
    res.render("details", {
        name: req.query.name, 
        result
        }
    );
});

// handle POST
app.post('/detail', (req,res) => {
    console.log(req.body)
    let found = movie.getItem(req.body.name);
    res.render("details", {name: req.body.name, result: found, movies: movie.getAll()});
});

// define 404 handler
app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});