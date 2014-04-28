
var userDao = require("../DatabaseConnections/UserDao");
var userobj = new userDao();

var ejs = require("ejs");

function User() {

}

User.prototype.validateUser = function(callback,request)
{

	console.log("user function ");
	
	userobj.validateUser(function(err,res) {
		callback(err,res);
		
	},request.userName,request.password);

};

User.prototype.searchPersonInfo =function(callback,attribute,searchValue){
	console.log("searchPersonInfo function "+attribute+" "+searchValue);
	userobj.getPersonInfo(function(err,res){
		callback(err,res);
	},attribute,searchValue);
	
};



User.prototype.viewCustomers = function(callback,request)
{
	
	console.log("view customers function ");
	userobj.viewCustomers(function(err,res) {
		callback(err,res);
		
	});

};

User.prototype.viewPremiumCustomers = function(callback,request)
{
	
	console.log("view premium customers function ");
	userobj.viewPremiumCustomers(function(err,res) {
		callback(err,res);
		
	});

};

User.prototype.viewSimpleCustomers = function(callback,request)
{
	
	console.log("view simple customers function ");
	userobj.viewSimpleCustomers(function(err,res) {
		callback(err,res);
		
	});

};


User.prototype.createUser = function(callback,request)
{
	
	console.log("signUp function ");
	userobj.createUser(function(err,res) {
		callback(err,res);
		
	},request.fname,request.lname,request.address,request.city,request.zip,request.state,request.membertype);

};


User.prototype.updateUser = function(callback,request,membershipID)
{
	console.log("Update User function ");
	userobj.updateUser(function(err,res) {
		
		callback(err,res);
		
	},membershipID,request.fname,request.lname,request.address,request.city,request.zip,request.state,request.membertype);

};


User.prototype.remove = function(callback,request){
	var membershipID = request.membershipID ;
	console.log("removeUser function "+membershipID);
	userobj.removeUser(function(err,res){
		callback(err,res);
	},membershipID);
};


module.exports = User;
