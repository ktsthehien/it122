let movies = [
    { name : "The Godfather", year : 1972, rate : 9.2, type : "Crime"},
    { name : "Casablanca", year : 1942, rate : 8.5, type : "Romance"},
    { name : "Titanic", year : 1997, rate : 7.8, type : "Romance"},
    { name : "Vertigo", year : 1958, rate : 8.3, type : "Mystery"},
    { name : " Platoon", year : 1986, rate : 8.1, type : "War"}
    ];


const getAll = () =>{
    return movies;
}

console.log(getAll())

// for (i=0; i<movies.length; i++) {
//     console.log(movies[i])
// }

// movies.forEach((movie) =>{
//     console.log(movie)
// });

const findMovie = (name) =>{
    return movies.find((movie) => {
        return movie.name ===name;
});
}
console.log(findMovie("Titanic"))


export { getAll, findMovie}


