var mysql = require('mysql');

function OrderDao() {
	
}


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Helloworld',
  port: '3306',
  database: 'videolib'
});
connection.connect();

OrderDao.prototype.viewHistory = function(callback, membershipId){
	
	console.log("membership "+membershipId);
	var sql = 'SELECT * FROM Orders where MemberShipID = \"dee1234567\"'; //+ membershipId + '\"';
	console.log(sql);
	connection.query(sql, function(err, rows, fields) {
		if (rows.length !== 0) {
			console.log("DATA : " + JSON.stringify(rows));
			callback(err, rows);
		} else {
			console.log("error is:" + err);
			callback(err, null);

		}

	});
	
};


OrderDao.prototype.viewAllHistory = function(callback){
	console.log("in dao 111");
	//connection.connect();
	var sql = 'SELECT * FROM orders';
	connection.query(sql, function(err, rows, fields) {
		console.log("in dao");
		if (rows.length !== 0) {
			console.log("In rows");
			callback(err, rows);
		} else {
			console.log("error is:" + err);
			callback(err, null);

		}

});
	
	
	
};

OrderDao.prototype.getMovieInfo = function(callback, MovieID){
	console.log("IN getMovieInfo ");
//	connection = mysql.createConnection(connection.config);
	var sql = 'SELECT * FROM Orders WHERE MovieID= "'+MovieID+'"';

	connection.query(sql, function(err, rows, fields) {
		if (rows.length !== 0) {
			console.log("DATA : " + JSON.stringify(rows));
			callback(err, rows);
		} else {
			console.log("error is:" + err);
			callback(err, rows);
		}

	});
};

module.exports = OrderDao;