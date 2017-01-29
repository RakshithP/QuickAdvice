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

        
        
    
    
    
})();