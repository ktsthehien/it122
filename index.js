'use strict'

import express from 'express';
import handlebars from "express-handlebars";
import { Movie } from "./models/movie.js";


const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

import cors from 'cors';
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

app.get('/', (req,res, next) => {
    Movie.find({}).lean()
    .then((movies) => {
//        res.render('home', { movies });

        res.render('home', {movies: JSON.stringify(movies)});
    });
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

// API routes

app.get('/api/movies/:name', (req, res, next) => {
    let name = req.params.name;
    Movie.findOne({name: name}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});


app.get('/api/movies', (req,res, next) => {
    Movie.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/movies/delete/:id', (req,res, next) => {
    Movie.deleteOne({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result});
    });
});

app.post('/api/movies/add', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let movie = new Movie(req.body);
        movie.save((err,newMovie) => {
            if (err) return next(err);
            res.json({updated: 0, _id: newMovie._id});
        });
    } else { // update existing document
        Movie.updateOne({ _id: req.body._id}, {name:req.body.name, year: req.body.year, rate: req.body.rate, type: req.body.type }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});