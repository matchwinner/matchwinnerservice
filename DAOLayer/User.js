var sql = require('mssql');
const http = require('http');
var express = require('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
//var status = '';

  // config for your database
  var config = {
    user: 'sa',
    password: 'conduent@1',
    server: 'BLRIDC52120896', 
    database: 'matchWinner' 
};

app.post('/register', function (req, res) {

  console.log('listing request parameters');
  console.log(req.body);
 
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
      var request = new sql.Request();

      request.input('userName', sql.VarChar(30), req.body.uName);
      request.input('userEmail', sql.VarChar(30), req.body.uMail);
      request.input('userMobile', sql.VarChar(30), req.body.uMob);
      request.input('userPassword', sql.VarChar(30), req.body.uPwd);
      request.output('test', sql.VarChar(30));
      request.execute('SP_InitiateUserRegn').then(function(err, recordsets, returnValue, affected) {
        console.dir(err.output.test);
        res.send(err.output.test);
      }).catch(function(err) {
        console.log(err);
      });

    })
});

app.post('/logout', function (req, res) {

  console.log(req.body);
 
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
      var request = new sql.Request();
      
      request.input('userID', sql.VarChar(30), req.body.uID);
      request.execute('SP_InitiateLogOut').then(function(err, recordsets, returnValue, affected) {
          console.dir(err);
          request.query("select userStatus from userData where userID in ('"+req.body.uID+"')", function (err, recordset) {
            if (err) console.log(err)
            console.log(recordset.recordset);
      
        // send records as a response
      
                res.send(recordset.recordset);
                
            });
        }).catch(function(err) {
          console.log(err);
        });
      
  });
});

app.post('/login', function (req, res) {

    console.log(req.body);
   
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new sql.Request();
        
        request.input('userEmail', sql.VarChar(30), req.body.uMail);
        request.input('userPassword',sql.VarChar(30), req.body.uPwd);
        request.execute('SP_InitiateLogin').then(function(err, recordsets, returnValue, affected) {
            console.dir(err);
            request.query("select userID,userName,userStatus from userData where userEmail in ('"+req.body.uMail+"') and userPassword in ('"+req.body.uPwd+"')", function (err, recordset) {
              if (err) console.log(err)
              console.log(recordset.recordset);
      
          // send records as a response
      
                  res.send(recordset.recordset);
                  
              });
          }).catch(function(err) {
            console.log(err);
          });
    });
});


 

var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
   
    console.log("Example app listening at http://%s:%s", host, port)
    console.log('Server is running..');
});