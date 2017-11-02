/* eslint no-console: [0] */
'use strict'

const _ = require('lodash')
const routes = require('./routes')
const policies = require('./policies')
const trailsCore = require('trails/lib').Core
const sm = require('sitemap')

module.exports = {

  /**
   * configure - Configure the Proxy Engine
   * @param app
   */
  configure: (app) => {
    app.api.sitemaps = app.api.sitemaps || {}
    // Define New properties on app
    Object.defineProperties(app, {
      sitemap: {
        enumerable: true,
        writable: false,
        value: sm.createSitemap ({
          hostname: app.config.get('proxySitemap.host'),
          cacheTime: app.config.get('proxySitemap.cache'),
          urls: []
        })
      },
      sitemaps: {
        enumerable: true,
        writable: false,
        value: {}
      }
    })

    // Bind the Methods
    Object.assign(app.sitemaps, trailsCore.bindMethods(app, 'sitemaps'))
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
    const prefix = app.config.get('proxySitemap.prefix')
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
