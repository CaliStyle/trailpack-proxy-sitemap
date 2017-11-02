'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')
const _ = require('lodash')

module.exports = class ProxySitemapTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {
    // Packs
    if (!_.includes(_.keys(this.app.packs), 'express')) {
      return Promise.reject(new Error('Trailpack-proxy-cart currently only works with express!'))
    }

    if (!_.includes(_.keys(this.app.packs), 'proxy-engine')) {
      return Promise.reject(new Error('Trailpack-proxy-cart requires trailpack-proxy-engine!'))
    }

    if (!this.app.config.proxySitemap) {
      return Promise.reject(new Error('No configuration found at config.proxySitemap!'))
    }

    return Promise.all([
      lib.Validator.validateProxySitemapConfig(this.app.config.proxySitemap)
    ])
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

