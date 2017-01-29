(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  router.use('/disease', require('./disease/index.js'));    
//  router.use('/random', require('./random'));    

  module.exports = router;

})();
