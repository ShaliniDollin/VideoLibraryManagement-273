
var mysql = require('mysql');

function MovieDao() {
	
}


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Helloworld',
  port: '3306',
  database: 'videolib'
});
connection.connect();

MovieDao.prototype.listMovies = function(callback, username, password){
	
	var sql = 'SELECT * FROM Movies where NoOfCopies > 0';
	
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

MovieDao.prototype.listUserMovies = function(callback, membershipId){
	
	console.log("membership "+membershipId);
	var sql = 'SELECT * FROM Orders where MemberShipID = '+"\"dee1234567\"";//\"' + membershipId + '\"';
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





MovieDao.prototype.searchMovie = function(callback, movieName, banner, category){
	console.log("In search movie dao"+movieName);
	//connection.connect();
	
	var sql = 'SELECT * FROM movies where Name like \'%\'"'+ movieName+'"\'%\' and Banner like \'%\'"'+banner+'"\'%\' and Category like \'%\'"'+category+'"\'%\' ';
	connection.query(sql, function(err, rows, fields) {
		console.log("Query Executed"+rows.length);
		if (rows.length !== 0) {
			console.log("In rows");
			console.log("DATA : " + JSON.stringify(rows));
			callback(err, rows);
		} else {
			console.log("in error");
			console.log("error is:" + err);
			callback(err, null);

		}

	});
	
	
};

MovieDao.prototype.issueMovie = function(callback, MovieId, membershipID){
	console.log("Hey i m der");
	console.log("In ISsue movie dao"+membershipID);
	//connection.connect();
	var result;
	//var resturnDate;
	var outstandingmovies = 0;
	var flag =0;
	var sql = 'select *  from movies where MovieID =  "'+ MovieId+'"';
	var sql3 = 'select * from person p join member_types mt on p.MemberTypeID = mt.MemberTypeID where p.MemberShipID = "'+membershipID+'"';
	var sql4 = 'select * from orders where MemberShipID = "'+membershipID+'"';
	connection.query(sql, function(err, rows, fields) {
		if (rows.length !== 0) {
			console.log("In  ISssue movies rows");
			console.log("DATA : " + JSON.stringify(rows));
			connection.query(sql3, function(err, rows1, fields){
				if(rows1[0].MemberType == 'Simple'){
					console.log("Simple member type");
					connection.query(sql4, function(err, rows2, fields){
						if(rows2.length != 0){
							var i = rows2.length;
							console.log("i is"+i);
							while(i > 0){
								i--;
								console.log("i1 is"+i);
								if(rows2[i].ReturnDate === null){
									flag = flag + 1;
									
								}
								console.log("flag count is"+flag);
							}
							if(flag < 2){
								console.log("in else")
								var noOfCopies = rows[0].noofcopies;
								noOfCopies = noOfCopies -1;
								var sql1 = 'UPDATE movies SET noofcopies ="'+noOfCopies+'" WHERE MovieID ="'+MovieId+'"';
								connection.query(sql1);
								var sql2= 'Insert into orders (MemberShipID, MovieID, TotalAmount, rentpaymentstatus) values("'+membershipID+'", "'+MovieId+'", "'+ rows[0].rentamount +'", 1)';
								connection.query(sql2);
								console.log("DATA : " + JSON.stringify(rows));
								result = "issued"; 
								
								
							}else{
								console.log("To check return date");
								result = "Not Issued";
								
							}
							callback(err, result);
						}else{
							console.log("in else")
							var noOfCopies = rows[0].noofcopies;
							noOfCopies = noOfCopies -1;
							var sql1 = 'UPDATE movies SET noofcopies ="'+noOfCopies+'" WHERE MovieID ="'+MovieId+'"';
							connection.query(sql1);
							var sql2= 'Insert into orders (MemberShipID, MovieID, TotalAmount, rentpaymentstatus) values("'+membershipID+'", "'+MovieId+'", "'+ rows[0].rentamount +'", 1)';
							connection.query(sql2);
							console.log("DATA : " + JSON.stringify(rows));
							result = "issued";
							callback(err, result);
						}
						
					});
					
				}else if(rows1[0].MemberType == 'Premium'){
						console.log("Premium member type");
						connection.query(sql4, function(err, rows2, fields){
							if(rows2.length != 0){
								var i = rows2.length;
								console.log("i is"+i);
								console.log("Returndate "+rows2[0].ReturnDate);
								while(i > 0){
									i--;
									console.log("i1 is"+i);
									if(rows2[i].ReturnDate === null){
										flag = flag + 1;									
									}
								}
								if(flag < 10){
									var noOfCopies = rows[0].noofcopies;
									noOfCopies = noOfCopies -1;
									var sql1 = 'UPDATE movies SET noofcopies ="'+noOfCopies+'" WHERE MovieID ="'+MovieId+'"';
									connection.query(sql1);
									var sql2= 'Insert into orders (MemberShipID, MovieID, TotalAmount, rentpaymentstatus) values("'+membershipID+'", "'+MovieId+'", "'+ rows[0].rentamount +'", 0)';
									connection.query(sql2);
									console.log("DATA : " + JSON.stringify(rows));
									result = "issued"; 
									
									
								}else{
									console.log("To check return date");
									result = "Not Issued";
									
								}
								callback(err, result);
							}else{
								console.log("in else")
								var noOfCopies = rows[0].noofcopies;
								noOfCopies = noOfCopies -1;
								var sql1 = 'UPDATE movies SET noofcopies ="'+noOfCopies+'" WHERE MovieID ="'+MovieId+'"';
								connection.query(sql1);
								var sql2= 'Insert into orders (MemberShipID, MovieID, TotalAmount, rentpaymentstatus) values("'+membershipID+'", "'+MovieId+'", "'+ rows[0].rentamount +'", 0)';
								connection.query(sql2);
								console.log("DATA : " + JSON.stringify(rows));
								result = "issued";
								callback(err, result);
							}
							
						});
				}
			
				
			});
						
		} else {
			console.log("error is:" + err);
			callback(err, null);

		}
		
	});
	
	
};

MovieDao.prototype.returnMovie = function(callback, movieID, membershipID){
	console.log("In return movie dao"+movieID);
	var sql1 = 'select noofcopies from movies where MovieID = '+ movieID ;
	var sql3 = 'Select * from orders where  MovieID = '+ movieID+' and MemberShipID = "'+ membershipID +'" and ReturnDate is null';
	connection.query(sql3, function(err, rows3, fields){
		if(rows3.length != 0 ){
			connection.query(sql1, function(err, rows, fields){
				if(rows.length != 0){
					var noofcopies = rows[0].noofcopies;
					noofcopies = noofcopies + 1;
					var sql2 = 'update movies set noofcopies = '+ noofcopies +' where movieid = '+ movieID;
					var sql = 'update orders set ReturnDate = current_date where MovieID = '+ movieID+' and MemberShipID = "'+ membershipID +'" ';
					connection.query(sql2);
					connection.query(sql, function(err, rows, fields) {
						if (rows.length === 0) {
							callback(err, null);
						}
						else {
							callback(err, rows);
							
						}
					});
				}else {
					console.log("update orders error is:" + err);
					callback(err, null);

				}
				
			});
			
		}else {
			console.log("no of copies error" + err);
			callback(err, null);
		}
		
	});

};

MovieDao.prototype.AddMovie = function(callback, Name, Banner, Date, RentAmount, Category, NoOfCopies){
	
	connection.connect();
	//console.log("USERNAME: " + username + " Password: " + password);
	var randomnumber=Math.floor(Math.random()*1001)
	var sql = 'INSERT INTO Movie SET ?';
	var data = {MovieID:randomnumber,Name:Name, Banner:Banner, Date:Date, RentAmount:RentAmount, Category:Category, NoOfCopies:NoOfCopies}
	connection.query(sql,data, function(err, result) {
		if (err) {
			var error = err.toString();
			
			console.log(error);
		} else {
			console.log("error is:" + err);
			callback(err, result);

		}

	});
	
	
};

MovieDao.prototype.DeleteMovie = function(callback, MovieID){
	
	var sql = 'DELETE FROM Movies WHERE MovieID = ' + MovieID;

	connection.query(sql, function(err, result) {
		if (err) {
			var error = err.toString();
			callback(err, null);
		} else {
			callback(err, result);

		}

	});
	
	
};

MovieDao.prototype.UpdateMovie = function(callback, MovieID, Name, Banner, Date, RentAmount, Category, NoOfCopies){

	var sql = "update Movies SET ? where MovieID='" + MovieID + " '";
	var data = {Name:Name, Banner:Banner, Date:Date, RentAmount:RentAmount, Category:Category, NoOfCopies:NoOfCopies}
	connection.query(sql,data, function(err, rows, fields) {
		if (rows.length !== 0) {
			console.log("DATA : " + JSON.stringify(rows));
			callback(err, rows);
		} else {
			console.log("error is:" + err);
			callback(err, null);

		}

	});


};

MovieDao.prototype.AddMovie = function(callback, Name, Banner, Date, RentAmount, Category, NoOfCopies){
	
	var randomnumber=Math.floor(Math.random()*1001)
	var sql = 'INSERT INTO Movies SET ?';
	var data = {MovieID:randomnumber, Name:Name, Banner:Banner, Date:Date, RentAmount:RentAmount, Category:Category, NoOfCopies:NoOfCopies}
	connection.query(sql,data, function(err, result) {
		if (err) {
			var error = err.toString();
			
			console.log(error);
		} else {
			console.log("Movie name" + Name);
			callback(err, result);

		}

	});
	
	
};


module.exports = MovieDao;


