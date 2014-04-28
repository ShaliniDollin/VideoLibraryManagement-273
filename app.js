
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require("ejs");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.cookieParser());
app.use(express.session({
	secret : '1234567890QWERTY'
}));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/WelcomePage', routes.index);
app.get('/Welcome', routes.welcomeUser);

// Customer Related

app.get('/viewCustomers', routes.viewCustomers);
app.get('/viewPremiumCustomers', routes.viewPremiumCustomers);
app.get('/viewNormalCustomers', routes.viewSimpleCustomers);
app.get('/viewHistory', routes.viewHistory);
app.get('/viewAllHistory', routes.viewAllHistory);
app.get('/searchPersonInfo',routes.searchPersonInfo);
app.post('/searchPersonInfoResult',routes.searchPersonInfoResult);


app.get('/updateUser',routes.updateUser);
app.post('/updateuser', routes.updateuser);
app.post('/createuser', routes.createuser);
app.get('/createUser', routes.createUser);
app.get('/removeuser',routes.removeuser);
app.post('/removeUser',routes.removeUser);


// Movie Related

app.get('/listMovies', routes.listMovies);
app.post('/searchMovie', routes.searchMovie);
app.post('/issueMovie', routes.issueMovie);
app.post('/returnMovie', routes.returnMovie);
app.get('/returnMovie', routes.returnMov);

app.post('/createmovie',routes.AddMovie);
app.post('/updatemovie',routes.UpdateMovie);
app.post('/delmovie',routes.DeleteMovie);
app.get('/addMovie',routes.addmov);
app.get('/updateMovie',routes.updatemov);
app.get('/deleteMovie',routes.delmov);

app.get('/viewMovieInfo/:movieId', routes.viewMovieInfo);


// For the user
app.get('/userLogin',routes.userLogin);
app.post('/validateUser', routes.validateUser);

app.get('/listUserMovies', routes.listUserMovies);

app.get('/updateUserProfile', routes.updateUserProfileRender);
app.post('/updateUserProfile', routes.updateUserProfile);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
