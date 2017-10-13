'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')

module.exports = class ProxySitemapTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {

  }

  /**
   * TODO document method
   */
  configure () {
    this.app.api.sitemap = this.app.api.sitemap || {}

    return Promise.all([
      lib.ProxySitemap.configure(this.app),
      lib.ProxySitemap.addPolicies(this.app),
      lib.ProxySitemap.addRoutes(this.app),
      lib.ProxySitemap.copyDefaults(this.app)
    ])
  }

  /**
   * TODO document method
   */
  initialize () {

  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

module.exports.Sitemap = lib.Sitemap

