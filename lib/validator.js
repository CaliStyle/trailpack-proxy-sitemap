
'use stict'
const joi = require('joi')
const lib = require('.')
// const Errors = require('proxy-engine-errors')

module.exports = {
  validateProxySitemapConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, lib.Schemas.proxySitemapConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.proxySitemap: ' + err))
        }
        return resolve(value)
      })
    })
  }
}
