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
  it('should have the sitemap in app.sitemap', (done) => {
    console.log(global.app.sitemap)
    assert.equal(global.app.sitemap.urls.length, 6)
    done()
  })
})
