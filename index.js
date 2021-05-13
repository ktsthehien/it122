'use strict'

import express from 'express';
import handlebars from "express-handlebars"
import { Movie } from "./models/movie.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

app.get('/', (req,res) => {
    Movie.find({}).lean()
        .then((movies) => {
            res.render('home', { movies });
        })
        .catch(err => next(err));
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Me: I am Hien Nguyen from Vietnam');
});


app.get('/detail', (req,res,next) => {
    Movie.findOne({ name:req.query.name }).lean()
        .then((movie) => {
            res.render('details', {result: movie} );
        })
        .catch(err => next(err));
});

app.post('/detail', (req,res, next) => {
    Movie.findOne({ name:req.body.name }).lean()
        .then((movie) => {
            res.render('details', {result: movie} );
        })
        .catch(err => next(err));
});

app.get('/delete', (req,res) => {
    Movie.remove({ name:req.query.name }, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        Movie.count((err, total) => {
            res.type('text/html');
            res.render('delete', {name: req.query.name, deleted: result.result.n !== 0, total: total } );    
        });
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});