'use strict'

module.exports = class Sitemap  {
  constructor (app) {
    Object.defineProperties(this, {
      app: {
        enumerable: false,
        value: app
      },
      build: {
        enumerable: false,
        writable: true,
        value: function(){
          //
        }
      }
    })
  }

  /**
   * Return the id of this cron
   */
  get id () {
    return this.constructor.name.replace(/(\w+)Sitemap/, '$1').toLowerCase()
  }

  /**
   * Get's the name of the cron class
   */
  get name() {
    return this.constructor.name
  }
}
