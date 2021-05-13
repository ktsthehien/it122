'use strict'
var Movie = require("./models/movie");

// export MongoDb methods as promise functions
exports.getAll = () => {
    // find all documents 
    console.log('getall')
    return Movie.find({}, (err, result) => {
        console.log(err)
        console.log(result)
        // output error if one occurred
        if (err) {
            console.log(err);
        } else {
            // otherwise output the array of documents
            return result;
        }
    });
};

exports.get = (name) => {
    return movies.find((item) => {
        return item.name.toLowerCase() === name.toLowerCase();
    });
};

exports.delete = (name) => {
    // retain array length for later comparison after array modification
    const oldLength = movies.length;
    movies = movies.filter((item) => {
        return item.name !== name;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== movies.length, total: movies.length };
};

exports.add = (newMovie) => {
    const oldLength = movies.length;
    // use existing get() method to check if movie already in our list
    let found = this.get(newMovie.name);
    if (!found) {
        movies.push(newMovie);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== movies.length, total: movies.length };
};