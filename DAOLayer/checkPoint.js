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



app.post('/validateEmail', function (req, res) {

    console.log('listing request parameters');
    console.log(req.body);
    let TM = req.body.uMail;
    let result='';
    console.log(TM);
    let exp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    console.log(exp.test(TM));
    if (TM =='') {
        result={validationStatus:1};
    }
    else if (exp.test(TM)) {
        result={validationStatus:0};
    }
    else {
        result={validationStatus:2};
    }   
    res.send(result);

  });
  

  var server = app.listen(5010, function () {
    var host = server.address().address
    var port = server.address().port
   
    console.log("Example app listening at http://%s:%s", host, port)
    console.log('Server is running..');
});