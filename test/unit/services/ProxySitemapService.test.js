'use strict'

const assert = require('assert')

describe('ProxySitemapService', () => {
  let ProxySitemapService
  it('should exist', () => {
    assert(global.app.services.ProxySitemapService)
    ProxySitemapService = global.app.services.ProxySitemapService
  })
  it('should build', (done) => {
    ProxySitemapService.build()
      .then(results => {
        assert.equal(results.length, 6)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should have the sitemap in app.sitemap after build()', (done) => {
    console.log(global.app.sitemap)
    assert.equal(global.app.sitemap.urls.length, 6)
    // global.app.sitemap.urls.forEach(url => {
    //   assert.include(url.url, global.app.config.get('proxySitemap.host'))
    // })
    done()
  })
})
