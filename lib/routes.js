'use strict'
// const Schemas = require('./schemas')

module.exports = [
  {
    method: ['GET'],
    path: '/sitemap.xml',
    handler: 'SitemapController.siteMapXml',
    config: {
      app: {
        proxyRouter: {
          ignore: true
        },
        proxyPermissions: {
          resource_name: 'apiGetSiteMapXml',
          roles: ['public','registered','admin']
        }
      }
    }
  }
]
