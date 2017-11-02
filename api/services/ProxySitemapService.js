/* eslint no-console: [0] */
'use strict'

const Service = require('trails/service')

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

        urls.forEach(url => {
          this.app.sitemap.del(url)
          this.app.sitemap.add(url)
        })

        return urls
      })
  }
}

