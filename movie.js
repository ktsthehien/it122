  
'use strict'

let movies = [
    { name : "The Godfather", year : 1972, rate : 9.2, type : "Crime"},
    { name : "Casablanca", year : 1942, rate : 8.5, type : "Romance"},
    { name : "Titanic", year : 1997, rate : 7.8, type : "Romance"},
    { name : "Vertigo", year : 1958, rate : 8.3, type : "Mystery"},
    { name : " Platoon", year : 1986, rate : 8.1, type : "War"}
    ];


const getAll = () => {
    return movies;
};


const getItem = (name) => {
    return movies.find((movie) => {
        return movie.name.toLowerCase() === name.toLowerCase();
    })
};

const deleteItem = (name) => {
    const oldLength = movies.length;
    movies = movies.filter((item) => {
        return item.name !== name;
    });
    return {deleted: oldLength !== movies.length, total: movies.length };
};

const addItem = (newMovie) => {
    const oldLength = movies.length;
    let found = getItem(newMovie.name);
    if (!found) {
        movies.push(newMovie);
    }
    return {added: oldLength !== movies.length, total: movies.length };
};

export { getAll, getItem, addItem, deleteItem }


