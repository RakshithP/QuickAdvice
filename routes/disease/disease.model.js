(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var DiseaseSchema = new Schema({
		Disease : String,
		Symptoms : []
    }, 
    { collection : 'Diseases' }
    );
    
module.exports = mongoose.model('Disease', DiseaseSchema);

})();