(function() {
  'use strict';

  var express = require('express');
  var controller = require('./disease.controller.js')    
    
  var router = express.Router();

  router.get('/getAll', controller.getAll);  
  router.get('/name/:disease', controller.getByName);  
  router.get('/symptom/:symptom', controller.getBySymptom);  
  //router.post('/new', controller.newDisease);  

  module.exports = router;

})();
