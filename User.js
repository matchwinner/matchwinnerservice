var sql = require('mssql');
var express = require('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

 

app.get('/', function (req, res) {
   
    //var sql = require("mssql");

 

    // config for your database
    var config = {
        user: 'sa',
        password: 'conduent@1',
        server: 'BLRIDC52120896', 
        database: 'matchWinner' 
    };

 

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

 

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from userData', function (err, recordset) {
            
            if (err) console.log(err)

 

            // send records as a response
            res.send(recordset);
            
        });
    });
});

 

var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
   
    console.log("Example app listening at http://%s:%s", host, port)
    console.log('Server is running..');
});