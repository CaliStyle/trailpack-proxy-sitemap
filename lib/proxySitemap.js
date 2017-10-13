/* eslint no-console: [0] */
'use strict'

const _ = require('lodash')
const routes = require('./routes')
const policies = require('./policies')
const trailsCore = require('trails/lib').Core

module.exports = {

  /**
   * configure - Configure the Proxy Engine
   * @param app
   */
  configure: (app) => {

    // Define New properties on app
    Object.defineProperties(app, {
      sitemap: {
        enumerable: true,
        writable: false,
        value: {}
      }
    })

    // Bind the Methods
    Object.assign(app.sitemap, trailsCore.bindMethods(app, 'sitemap'))
    return
  },

  /**
   * init - Initialize
   * @param app
   */
  init: (app) => {
    // const proxysitemap = app.services.ProxySocialService.proxysitemap
  },

  /**
   * addRoutes - Add the Proxy Router controller routes
   * @param app
   */
  addRoutes: (app) => {
    const prefix = _.get(app.config, 'proxysitemap.prefix') || _.get(app.config, 'footprints.prefix')
    const routerUtil = app.packs.router.util
    if (prefix){
      routes.forEach(route => {
        route.path = prefix + route.path
      })
    }
    app.config.routes = routerUtil.mergeRoutes(routes, app.config.routes)
    return Promise.resolve({})
  },
  /**
   *
   * @param app
   * @returns {Promise.<{}>}
   */
  addPolicies: (app) => {
    app.config.policies = _.merge(policies, app.config.policies)
    return Promise.resolve({})
  },
  /**
   * copyDefaults - Copies the default configuration so that it can be restored later
   * @param app
   * @returns {Promise.<{}>}
   */
  copyDefaults: (app) => {
    app.config.proxySitemapDefaults = _.clone(app.config.proxySitemap)
    return Promise.resolve({})
  }
}
