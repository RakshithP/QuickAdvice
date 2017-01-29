var http = require('http');
var request = require('request');
var express = require('express');
var twilio = require('twilio')("AC87b33b99abdbf60842b57ebcac3b0a73", "9a106c6c08499c61fb2c7b4a78bfe593"); //API credentials
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

//var api = require('./routes/api.js'); //gets api logic from path

//-------------------------MongoDB Setup-----------------------------//
var mongoose = require('mongoose');                         
var mongoURI = "mongodb://10.104.176.21:27017/DiseaseDB";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

//app.use('/api', api); //sets the API used to access the Database

//use ngrok to generate link to be placed in twilio's app dashboard, or host on public server 
//post request to send sms to twilio owned number 
app.post("/message", function (req, res) {
  console.log("check");
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  var Disease = require('./routes/disease/disease.model.js');
  var messageBody; 
  
  //before I look in the database
  console.log(req.body.Body + "\n" + req.body.From + "\n"); 
  console.dir(req.body);
  var python = require('child_process').spawn('python3', ["./lang.py", req.body.Body] );  // second argument is array of parameters, e.g.:
  var output = [];
  python.stdout.on('data', function(data){output.concat(data)});
  python.on('close', function(code){ 
  if (code !== 0) {  
    return res.send(500, code); 
  }
     });
   // } else { res.send(500, 'No file found') }
	Disease.find(
		{
			"Symptoms" : 
				{
					$in : output
				} 
		},function (err, dataResult) {
            //after I looked in the database
			
			//on error
			if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

			// check if empty query result
            if(dataResult.length < 1) {
				console.log("NO DATA FOUND");
				messageBody = "No diseases found"; 
            } else{
				console.log(dataResult);
				for(var i=0; i< dataResult.length; i++){
					console.log(dataResult[i].Disease);
					messageBody = dataResult[i].Disease + " ";
				}
			}
			
			console.log("warning " + dataResult[0]); 
			twiml.message(function(){
				console.log(messageBody);
				this.body(messageBody);
				console.log("after body");
			});
			console.log("sending res");
			res.writeHead(200, {'Content-Type': 'text/xml'});
			res.end(twiml.toString());  
		});
});

app.get("/", function(req,res){
	var Disease = require('./routes/disease/disease.model.js');
	console.log("Test Run");
	Disease.find({}, function (err, dataResult) {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
		console.log(dataResult);
		for(var i=0; i< dataResult.length; i++){
			console.log(dataResult[i].Disease);
	}
	return res.json(dataResult);
	});
	
});
 
http.createServer(app).listen(8080, function () {
  console.log("Express server listening on port 8080");
});