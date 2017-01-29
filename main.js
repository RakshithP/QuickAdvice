var http = require('http');
var request = require('request');
var express = require('express');
var twilio = require('twilio')("AC87b33b99abdbf60842b57ebcac3b0a73", "9a106c6c08499c61fb2c7b4a78bfe593"); //API credentials
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

var api = require('./routes/api.js'); //gets api logic from path

//-------------------------MongoDB Setup-----------------------------//
var mongoose = require('mongoose');                         
var mongoURI = "mongodb://10.104.176.21:27017/DiseaseDB";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

app.use('/api', api); //sets the API used to access the Database

//use ngrok to generate link to be placed in twilio's app dashboard, or host on public server 
//post request to send sms to twilio owned number 
app.post("/message", function (req, res) {
  console.log(req.body.Body + "\n" + req.body.From + "\n");
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  twiml.message(function(){
		this.body('Here is your query');
	 });
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString()); 
});

app.get("/", function(req,response){
  console.log("Hello");
});
 
http.createServer(app).listen(8080, function () {
  console.log("Express server listening on port 8080");
});