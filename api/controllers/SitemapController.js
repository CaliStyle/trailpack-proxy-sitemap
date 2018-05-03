'use strict'

const Controller = require('trails/controller')
const _ = require('lodash')
/**
 * @module SitemapController
 * @description SitemapController.
 */
module.exports = class SitemapController extends Controller {
  siteMapXml(req, res) {

    const store = _.get(this.app.config, 'proxySitemap.cache.prefix')
    const proxyDefaultCache = this.app.services.CacheService.getStore(store)

    proxyDefaultCache.get('/sitemap.xml')
      .then(result => {
        if (result) {
          return result
        }
        return new Promise((resolve, reject) => {
          this.app.sitemap.toXML( function (err, xml) {
            if (err) {
              return reject(err)
            }
            else {
              return resolve(xml)
            }
          })
        })
      })
      .then(xml => {
        res.header('Content-Type', 'application/xml')
        res.send(xml)
      })
  }
}

