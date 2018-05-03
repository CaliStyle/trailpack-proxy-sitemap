'use strict'
const joi = require('joi')

module.exports = joi.object().keys({
  host: joi.string(),
  cache: joi.object().keys({
    prefix: joi.string(),
    eject: joi.number()
  })
}).unknown()
