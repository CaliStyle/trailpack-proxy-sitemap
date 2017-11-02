'use strict'

const Service = require('trails/service')
const sm = require('sitemap')
/**
 * @module ProxySitemapService
 * @description SitemapService
 */
module.exports = class ProxySitemapService extends Service {
  build() {

    let siteMap
    return Promise.all(this.app.sitemaps.forEach(sitemap => {
      return sitemap.build()
    }))
      .then(sitemaps => {
        siteMap = sm.createSitemap ({
          hostname: 'http://example.com',
          cacheTime: 600000, // 600 sec - cache purge period
          urls: sitemaps
        })

        this.app.sitemap = siteMap
        return
      })
  }
}

