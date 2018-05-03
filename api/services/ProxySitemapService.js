/* eslint new-cap: 0*/
/* eslint no-console: [0] */
'use strict'

const Service = require('trails/service')
const sm = require('sitemap')

/**
 * @module ProxySitemapService
 * @description SitemapService
 */
module.exports = class ProxySitemapService extends Service {
  /**
   * Builds all Sitemaps
   * @returns {Promise.<TResult>}
   */
  build() {

    let siteMaps = [], urls = []

    for (const sitemap in this.app.sitemaps) {
      // skip loop if the property is from prototype
      if (!this.app.sitemaps.hasOwnProperty(sitemap)){
        continue
      }
      siteMaps.push(this.app.sitemaps[sitemap])
    }

    return Promise.all(siteMaps.map(sitemap => {
      return sitemap.build()
    }))
      .then(results => {
        results = results || []
        // Add all the results to a single array
        results.forEach(sitemap => {
          urls = [...urls, ...sitemap]
        })

        // Build a new map
        const newMap = sm.createSitemap({
          hostname: this.app.config.get('proxySitemap.host'),
          cacheTime: this.app.config.get('proxySitemap.cache.eject'),
          urls: urls
        })

        // Initiate the map
        newMap.toString()

        // Map the composed urls to the app's sitemap
        newMap.urls.forEach(url => {
          // Remove the old url object if it exists
          this.app.sitemap.del(url)
          // Add the new url object
          this.app.sitemap.add(url)
        })

        return urls
      })
  }
}

