'use strict'

const Controller = require('trails/controller')
/**
 * @module SitemapController
 * @description SitemapController.
 */
module.exports = class SitemapController extends Controller {
  siteMapXml(req, res) {
    this.app.sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end()
      }
      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  }
}

