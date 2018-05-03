'use strict'
const _ = require('lodash')

module.exports = class Sitemap  {
  constructor (app) {
    Object.defineProperties(this, {
      app: {
        enumerable: false,
        value: app
      },
      build: {
        enumerable: false,
        value: function() {
          const unhallowedMethods = ['build']
          const allowedMethods = _.difference(this.methods, unhallowedMethods)
          let urls = []

          return Promise.all(allowedMethods.map(method => {
            return this[method]()
          }))
            .then(results => {
              results = results || []
              results.forEach(sitemap => {
                urls = [...urls, ...sitemap]
              })

              return urls
            })
            .catch(err => {
              this.app.log.error(err)
              return urls
            })
        },
        writable: true
      }
    })
  }

  /**
   * Return the id of this sitemap
   */
  get id () {
    return this.constructor.name.replace(/(\w+)Sitemap/, '$1').toLowerCase()
  }

  /**
   * Get's the name of the sitemap class
   */
  get name() {
    return this.constructor.name
  }
}
