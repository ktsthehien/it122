import { expect } from 'chai';
import * as movie from "../movie.js";

describe("movie module", () => {
 it("returns requested movie", function() {
   var result = movie.getItem("The Godfather");
   expect(result).to.deep.equal({name : "The Godfather", year : 1972, rate : 9.2, type : "Crime"});
 });

 it("fails w/ invalid movie", () => {
   var result = movie.getItem("fake");
   expect(result).to.be.undefined;
 });

 it("adds a new movie", function() {
  let result = movie.addItem({name : "The Godfather 2", year : 1972, rate : 9.2, type : "Crime"});
  expect(result.added).to.be.true;
});
it("fails to add an existing movie", function() {
  let result = movie.addItem({name : "The Godfather", year : 1972, rate : 9.2, type : "Crime"});
  expect(result.added).to.be.false;
});

it("deletes an existing movie", function() {
  let result = movie.deleteItem("The Godfather");
  expect(result.deleted).to.be.true;
});
it("fails to delete an invalid movie", function() {
  let result = movie.deleteItem("The Godfather 3");
  expect(result.deleted).to.be.false;
});
});

