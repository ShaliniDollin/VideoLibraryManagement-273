var orderDao = require("../DatabaseConnections/OrderDao");
var orderObj = new orderDao();

var ejs = require("ejs");

function Order() {

}

Order.prototype.viewHistory = function(callback,membershipId)
{

	console.log("view history function ");
	
	orderObj.viewHistory(function(err,res) {
		callback(err,res);
		
	},membershipId);

};

Order.prototype.viewMovieInfo = function(callback,request)
{

	console.log("view history function ");
	
	orderObj.getMovieInfo(function(err,res) {
		callback(err,res);
		
	},request.movieId);
	
	
};

exports.generateBill = function(req,res){
	var MemberShipID = req.param("id"); //'dee1234567'; //hard code here, should be input by admin
	var newOrder = new orderDao();
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

Order.prototype.viewAllHistory = function(callback)
{

	console.log("view history function ");
	
	orderObj.viewAllHistory(function(err,res) {
		callback(err,res);
		
	});

};

module.exports = Order;