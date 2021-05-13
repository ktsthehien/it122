'use strict'

import { Movie } from "./movie.js";

// find all documents
Movie.find({}, (err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
    return
});

// count # of docs
console.log("step 1")
Movie.countDocuments((err, result) => {
    console.log("step 2")
    console.log(result + " db entries");
});
console.log("step 3")