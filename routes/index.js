
var user = require('../Model/User');
var movie = require('../Model/Movie');
var order = require('../Model/Order');
var ejs = require("ejs");

// hadrcoded value. we need to get the value from session
var membershipid ="3";


exports.index = function(req, res){
	res.render('WelcomePage');
  
};

exports.updateUserProfileRender = function(req, res){
	res.render('UpdateUserProfile');
  
};

exports.updateUserProfile = function(req, res){
	res.render('UpdateUserProfile');
  
};

exports.welcomeUser = function(req, res){
	res.render('Welcome');
  
};


exports.searchPersonInfo = function(req, res){
	console.log("searchPersonInfo");
  res.render('searchPersonInfo');
  
};

exports.addmov = function(req, res){
	console.log("addmov");
  res.render('addmov', { title: 'addmov' });
  
};


exports.userLogin = function(req, res){
	console.log("userLogin");
  res.render('UserLogin');
  
};

exports.delmov = function(req, res){
	console.log("delmov");
  res.render('delmov', { title: 'delmov' });
  
};


exports.updatemov = function(req, res){
	console.log("updatemov");
  res.render('updatemov', { title: 'updatemov' });
  
};

exports.userSignIn =function(req,res){
	if(!req.session.name){
		
		console.log("user sign in");
		res.render('SignIn',{message:""});
	}
	else{
		
	console.log("Update User");
	res.render('Welcome',{name:req.session.name});
	}
	
};



exports.signUp =function(req,res){
	console.log("signup");
	res.render('SignUpin');
};

exports.validateUser =function(req,res){
	console.log("validate user");
	var newUser = new user();
	newUser.validateUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.render('Welcome.ejs');
		}

	},req.body);
	
	console.log("Username "+ req.param('userName'));
};

exports.createUser =function(req,res){
	console.log("CreateUser Function");
	res.render('CreateUser');
};

exports.createuser =function(req,res){
	console.log("create user");
	var newUser = new user();
	var a = req.param;
	console.log("a"+ a);
	//newUser.validateUser(req.param('username'), req.param('password'));
	newUser.createUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.render('UserCreated.ejs');
		}

	},req.body);
	console.log("Username"+ req.param('userName'));
	console.log("Username"+ req.param('password'));
};

exports.viewAllHistory =function(req,res){
	console.log("view history");
	var orders = new order();
	
	orders.viewAllHistory(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			if(result == null){
				res.send("There are no orders Placed!!");
				
			}else{
			ejs.renderFile('views/AdminHistory.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
			}
		}
		// instead ofmembership id which is hardcoded, here we need to send the value from session

	});
};

exports.listMovies =function(req,res){
	console.log("list movies index");
	var newMovie = new movie();
	
	newMovie.listMovies(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			ejs.renderFile('views/ListMovies.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
		}

	},req.body);
};


exports.viewCustomers =function(req,res){
	console.log("view customers");
	var newUser = new user();
	
	newUser.viewCustomers(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			ejs.renderFile('views/ViewCustomers.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
		}

	},req.body);
};



exports.viewPremiumCustomers =function(req,res){
	console.log("view premium customers");
	var newUser = new user();
	
	newUser.viewPremiumCustomers(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			ejs.renderFile('views/ViewPremiumCustomers.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
		}

	},req.body);
};



exports.viewSimpleCustomers =function(req,res){
	console.log("view simple customers");
	var newUser = new user();
	
	newUser.viewSimpleCustomers(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			ejs.renderFile('views/ViewSimpleCustomers.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
		}

	},req.body);
};


exports.viewHistory =function(req,res){
	console.log("view history");
	var orders = new order();
	
	orders.viewHistory(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			ejs.renderFile('views/ViewHistory.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
		}

	},membershipid);
};


exports.listUserMovies =function(req,res){
	console.log("listUserMovies");
	var movies = new movie();
	
	movies.listUserMovies(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			ejs.renderFile('views/ListUserMovies.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
		}
	},membershipid);
};


exports.searchMovie =function(req,res){
	console.log("In searh Movie");
	var newMovie = new movie();
	
	newMovie.searchMovie(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			if (result == null){
				res.send("Invalid DAta!! Try Again")
			}else{
			//res.send(result);
			ejs.renderFile('views/searchMovie.ejs', {
				result : result
			}, function(err, result) {
				// render on success
					res.end(result);
				
			});
		}
	}

	},req.body);
};

exports.issueMovie =function(req,res){
	console.log("In issue Movie");
	var newMovie = new movie();
	
	newMovie.issueMovie(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			if(result === null){
				res.send("Invalid Data! Try Again");
			}else{
				res.render('MovieIssued.ejs');
			}

		}

	},req.body);
};

exports.returnMov = function(req, res){
	console.log("returnMov");
  res.render('ReturnMovie');
  
};


exports.viewMovieInfo =function(req,res){
	console.log("view Movie");
	var newMovie = new movie();
	var newOrder = new order();
	newOrder.viewMovieInfo(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			
			ejs.renderFile('views/viewMovieInfo.ejs', {
				result : result,movieId:req.params.movieId}, function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.end('An error occurred in rendering page');
						console.log(err);
					}
				});
		}

	},req.params);
};

exports.searchPersonInfoResult = function(req,res){
	var attribute = req.param("dropdown");
	var searchValue = req.param("searchValue");
	console.log(attribute);
	console.log(searchValue);
	var newUser = new user();
	newUser.searchPersonInfo(function(err,result){
		if(err){
			console.log("Error"+err);
			throw(err);
		}else{
			res.render('SearchPersonInfoResult.ejs',
					 {data:result
					 },
					 function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
					
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	},attribute,searchValue);
};

exports.returnMovie =function(req,res){
	console.log("In return Movie");
	if(req.param('movieID') == null || req.param('membershipID') == null){
		res.send("Invalid Data!! Try Again!");
	}else{
	
	var newMovie = new movie();
	
	newMovie.returnMovie(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			if(result === null){
				res.send("Invalid Data! Try Again");
			}else{
				res.render('MovieReturned');
			}

		}

	},req.body);
	}
};

exports.updateUser =function(req,res){
	if(!req.session.name){
		res.render('SignIn.ejs',{message:"Please login to update your profile"});
	}
	else{
	console.log("Update User");
	res.render('updateUser');
	}
};

exports.updateuser =function(req,res){
	//req.body.MemberShipID = "937-49-3682";
	console.log("Update user");
	var newUser = new user();
	newUser.updateUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			console.log(result.MemberShipID);
			res.render('Welcome.ejs',{name:req.session.name,message:"Your Profile Has been Updated"});
		}

	},req.body,req.session.name);
};

exports.removeuser =function(req,res){
	console.log("RemoveUser Function");
	res.render('RemoveUser',{message:""});
};

exports.removeUser = function(req,res){
	//var memberTypeID = req.session.name;  //hard code here, should get from user add/update/delete page

	var newUser = new user();
	newUser.remove(function(err,result){
		if(err){
			console.log("remove user error"+err);
			res.render('RemoveUser',{message:err});
			//throw(err);
		}else{
			//return number of rows that deleted
			console.log("return "+result);
			res.render('RemoveUser.ejs',{message:"User Removed Successfully"});
		}

	}, req.body);

};

exports.logout =function(req,res){
	console.log("logout Function");
	req.session.name=null;
	req.session.destroy();
	
	//delete req.session;
	if(!req.session){ //logout true
		res.render('SignIn',{message:"You have been logged out sucessfully"});
	}else{ //logout false
	res.render('Welcome',{name:req.session.name});
	}
	
};



exports.generateBill = function(req,res){
	var MemberShipID = req.param("id"); //'dee1234567'; //hard code here, should be input by admin
	var newOrder = new order();
	newOrder.generateBill(function(err,result,total){
		if(err){
			console.log("generateBill error"+err);
			throw(err);
		}else{
			console.log("return "+JSON.stringify(result));
			console.log(total);
			 res.render('Bill.ejs',
					 {data:result,
					  total:total
					 },
					 function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
					
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
		
	},MemberShipID);
	
};

exports.DeleteMovie =function(req,res){
	console.log("To Delete Movie");
	var newMovie = new movie();
	newMovie.DeleteMovie(function(err,result) {
		if(err){
			res.send("The movie is issued to customers. Please clear the issues first and then delete the movie");

		}
		else {
			
			res.render('DeleteMovie.ejs');
		}

	},req.body);
	console.log("MovieName"+ req.param('Name'));
};

exports.UpdateMovie =function(req,res){
	console.log("To Update Movie");
	var newMovie = new movie();
	//newUser.validateUser(req.param('username'), req.param('password'));
	newMovie.UpdateMovie(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.render('UpdateMovie.ejs');
		}

	},req.body);
	console.log("MovieName"+ req.param('Name'));
};

exports.AddMovie =function(req,res){
	console.log("To Add Movie");
	var newMovie = new movie();

	newMovie.AddMovie(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.render('ADDMOVIE.ejs');
		}

	},req.body);
	console.log("MovieName"+ req.param('Name'));
};

