(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var DiseaseSchema = new Schema({
		Disease : String,
		Symptoms : [],
		Treatment : String,
		Doctor : String
    }, 
    { collection : 'Diseases' }
    );
    
 module.exports = mongoose.model('Disease', DiseaseSchema);

})();