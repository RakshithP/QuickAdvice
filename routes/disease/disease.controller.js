(function() {
    'use strict';

    var Disease = require('./disease.model.js');

    //grab all players
    module.exports.getAll = function(req, res) { 
        Disease.find({}, function (err, dataResult) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(dataResult);
        });
    };
    
    //gets Disease by passed param device number
    module.exports.getByName = function(req, res) { 
        Disease.find({"Disease" : req.params.disease}, function (err, dataResult) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(dataResult);
        });
    };
    
    module.exports.getBySymptom = function(req, res) { 

        console.log("DATA SENT: " + req.params.symptom);
        //before I look in the database


        Disease.find(
            {
                "Symptoms" : 
                {
                    $in : [req.params.symptom]
                } 
            }
            , function (err, dataResult) {

            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            //after I looked in the database

            if(dataResult.length < 1) {
                return res.send("No disease found");
            } 
            //console.dir(dataResult);
            //res.send(dataResult[0]._doc.Treatment);
            return res.send(dataResult);
        });
    };
        
        
    
    
    
})();