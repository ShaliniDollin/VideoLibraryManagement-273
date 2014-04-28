
var movieDao = require("../DatabaseConnections/MovieDao");
var movieObj = new movieDao();

var ejs = require("ejs");

function Movie() {

}

Movie.prototype.listMovies = function(callback,request)
{

	console.log("list movie function");
	
	movieObj.listMovies(function(err,res) {
		callback(err,res);
	});

};


Movie.prototype.searchMovie = function(callback,request)
{

	console.log("In movie class search function");
	
	movieObj.searchMovie(function(err,res) {
		callback(err,res);
	},request.movieName, request.banner, request.category);

};

Movie.prototype.issueMovie = function(callback,request)
{

	console.log("In movie class issue function");
	
	movieObj.issueMovie(function(err,res) {
		callback(err,res);
	},request.MovieId, request.membershipID);

};

Movie.prototype.returnMovie = function(callback,request)
{

	console.log("In movie class return function");
	
	movieObj.returnMovie(function(err,res) {
		callback(err,res);
	},request.movieID, request.membershipID);

};

Movie.prototype.validateMovie = function(callback,request)
{

	console.log("Movie function ");
	
	movieObj.AddMovie(function(err,res) {
		callback(err,res);
		
	},request.Name, request.Banner, request.Date, request.RentAmount, request.Category, request.NoOfCopies);

};
Movie.prototype.AddMovie = function(callback,request)
{

	console.log("ADD Movie function ");
	
	movieObj.AddMovie(function(err,res) {
		callback(err,res);
		
	},request.Name, request.Banner, request.Date, request.RentAmount, request.Category, request.NoOfCopies);

};

Movie.prototype.DeleteMovie = function(callback,request)
{
	
	console.log("Delete Movie function ");
	movieObj.DeleteMovie(function(err,res) {
		
		if(err) {
			
			callback(err,null);
		}
		else {
		callback(err,res);
		
		}
		
	},request.MovieID);

};
Movie.prototype.UpdateMovie = function(callback,request)
{
	
	console.log("Update Movie function ");
	movieObj.UpdateMovie(function(err,res) {
		callback(err,res);
		
	},request.MovieID ,request.Name, request.Banner, request.Date, request.RentAmount, request.Category, request.NoOfCopies);

};

Movie.prototype.listUserMovies = function(callback,membershipId)
{

	console.log("listUserMovies");
	
	movieObj.listUserMovies(function(err,res) {
		callback(err,res);
		
	},membershipId);

};

module.exports = Movie;
