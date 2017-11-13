'use strict'
const joi = require('joi')

module.exports = joi.object().keys({
  host: joi.string(),
  cache: joi.number()
}).unknown()
