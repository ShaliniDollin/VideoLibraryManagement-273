
var mysql = require('mysql');

function UserDao() {
	
}


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Helloworld',
  port: '3306',
  database: 'videolib'
});
connection.connect();

UserDao.prototype.validateUser = function(callback, membershipId, password){
	
	//
	//console.log("USERNAME: " + username + " Password: " + password);
	
	var sql = 'SELECT * FROM person WHERE MemberShipID="' + membershipId + '" AND PASSWORD="' + password + '"';
	
	connection.query(sql, function(err, rows, fields) {
		if (rows.length !== 0) {
			console.log("DATA : " + JSON.stringify(rows));
			callback(err, rows);
		} else {
			console.log("error is:" + err);
			callback(err, null);

		}

	});
	//connection.end();
	
	
};

UserDao.prototype.signUp = function(callback, username, password){
	
	//connection.connect();
	//console.log("USERNAME: " + username + " Password: " + password);
	
	var sql = 'INSERT INTO Person SET ?';
	var data = {FNAME:username,PASSWORD:password}
	connection.query(sql,data, function(err, result) {
		if (err) {
			var error = err.toString();
			
			console.log(error);
		} else {
			console.log("error is:" + err);
			callback(err, result);

		}

	});
	
	//connection.end();
};


UserDao.prototype.viewCustomers = function(callback, username, password){
	
	//connection.connect();
	var sql = 'SELECT * FROM person';
	
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

UserDao.prototype.viewPremiumCustomers = function(callback){
	
	var sql = 'SELECT * FROM person where MemberTypeID = 2';
	
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

UserDao.prototype.getPersonInfo = function(callback,attribute,searchValue){
	console.log("DAOselectPerson");
	connection = mysql.createConnection(connection.config);
	connection.connect();
	var sql = 'Select * From person WHERE '+attribute+' = "'+searchValue+'"' ;
	console.log(sql);
	connection.query(sql, function(err, rows, fields) {
		if (rows.length !== 0) {
			console.log("DATA : " + JSON.stringify(rows));
			callback(err, rows);
		} else {
			console.log("error is:" + err);
			callback(err, null);
			connection.end();
		}

	});
};

UserDao.prototype.viewSimpleCustomers = function(callback){
	
	var sql = 'SELECT * FROM person where MemberTypeID = 1';
	
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


UserDao.prototype.createUser = function(callback, fname, lname,address,city,zip,state,membertype){
	
	
	//console.log("USERNAME: " + username + " Password: " + password);
	var membershipID= (Math.floor(Math.random() * 900)+100)+"-"+ (Math.floor(Math.random() * 100)+10)+"-"+ (Math.floor(Math.random() * 9000)+1000);
	var sql = 'INSERT INTO person SET ?';
	//var Address = address+" "+city+" "+state+" "+zip;
	var data = {MemberShipID:membershipID,FirstName: fname,LastName:lname,Password:lname,Address:address,City:city,State:state,ZipCode:zip,MemberTypeID:membertype};
	connection.query(sql,data, function(err, result) {
		if (err) {
			var error = err.toString();
		
			console.log(error);
		} else {
			
			result.data = data;
			console.log(result);
		}
		callback(err, result);
	});
	
	
};




UserDao.prototype.updateUser = function(callback, membershipID,fname, lname,address,city,zip,state){
	
	
	//console.log("USERNAME: " + username + " Password: " + password);
	//var membershipID= (Math.floor(Math.random() * 900)+100)+"-"+ (Math.floor(Math.random() * 100)+10)+"-"+ (Math.floor(Math.random() * 9000)+1000);
	var sql = 'UPDATE Person SET ? WHERE MemberShipID="'+membershipID+'"';
	//var Address = address+" "+city+" "+state+" "+zip;
	var data = [{FirstName: fname,LastName:lname,Password:lname,Address:address,City:city,State:state,ZipCode:zip},{MemberShipID:membershipID}];
	
	connection.query(sql,data, function(err, result) {
		if (err) {
			var error = err.toString();
		
			console.log(error);
		} else {
			var numRows = result.affectedRows;
			console.log(numRows);
			if(numRows!=0){
			console.log("Update User");
			callback(err,numRows);
			}
			else{
				err = "Please login again, Your profile has not been updated. ";
				callback(err,null);
			}

		}
		callback(err, result);
	});
	
	
};


UserDao.prototype.removeUser = function (callback, membershipID){
	console.log("DAOremove ");
	
	var sql_select = 'SELECT * FROM Orders WHERE MemberShipID="'+membershipID+'"AND RentPaymentStatus=0';
	connection.query(sql_select, function(err, rows, fields) {
	if(rows.length !== 0){
		err ="The User Has Open Orders. Please Close the Orders Before Deleting";
		callback(err,null);
	}
	else{
	var sql_delete = 'DELETE FROM Person WHERE MemberShipID =  \"'+membershipID + "\"";
	console.log(sql_delete);
	connection.query(sql_delete,function(err,result){
		if(err){
			var error = err.toString();
			console.log(error);
			callback(err,null);
		}else{
		    var numRows = result.affectedRows;
			console.log(numRows);
			if(numRows!=0){
				console.log("deleting User");
				callback(err,numRows);
			}
			else{
				err = "Please Check the membership ID number. This Membership ID does not exist in the system ";
				callback(err,null);
			}
		}
	});
	}
	});
};




module.exports = UserDao;


