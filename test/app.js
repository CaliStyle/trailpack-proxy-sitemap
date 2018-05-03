'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')
const fs = require('fs')
const path = require('path')

const fsStore = require('cache-manager-fs')

const Sitemap = require('../').Sitemap

const SERVER = process.env.SERVER || 'express'
const ORM = process.env.ORM || 'sequelize'
const DIALECT = process.env.DIALECT || 'sqlite'

const packs = [
  require('trailpack-router'),
  require('trailpack-proxy-cache'),
  require('trailpack-proxy-engine'),
  require('../') // trailpack-proxy-sitemap
]

let web = {}

const stores = {
  sqlitedev: {
    adapter: require('sails-disk')
  },
  api: require('../api'),
}

if (ORM === 'waterline') {
  packs.push(require('trailpack-waterline'))
}
else if (ORM === 'sequelize') {
  packs.push(require('trailpack-proxy-sequelize'))
  if (DIALECT == 'postgres') {
    stores.sqlitedev = {
      database: 'ProxySitemap',
      host: '127.0.0.1',
      dialect: 'postgres'
    }
  }
  else {
    stores.sqlitedev = {
      database: 'ProxySitemap',
      storage: './test/test.sqlite',
      host: '127.0.0.1',
      dialect: 'sqlite'
    }
  }
}

if ( SERVER == 'express' ) {
  packs.push(require('trailpack-express'))
  web = {
    express: require('express'),
    middlewares: {
      order: [
        'static',
        'addMethods',
        'cookieParser',
        'session',
        'bodyParser',
        'methodOverride',
        'router',
        'www',
        '404',
        '500'
      ],
      static: require('express').static('test/static')
    }
  }
}

const App = {
  api: {
    sitemaps: {
      TestSitemap: class TestSitemap extends Sitemap {
        test() {
          return Promise.resolve([
            { url: '/page-1/',  changefreq: 'daily', priority: 0.3 },
            { url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 },
            { url: '/page-3/', img: 'http://urlTest.com' }
          ])
        }

        test2() {
          return Promise.resolve([
            { url: '/page-4/',  changefreq: 'daily', priority: 0.3 },
            { url: '/page-5/',  changefreq: 'monthly',  priority: 0.7 },
            { url: '/page-6/', img: 'http://urlTest.com' }
          ])
        }
      }
    }
  },
  pkg: {
    name: 'trailpack-proxy-sitemaps-test',
    version: '1.0.0'
  },
  config: {
    routes: [],
    main: {
      packs: packs
    },
    proxyCache: {
      stores: [
        {
          name: 'memory',
          store: 'memory',
          max: 100,
          ttl: 0
        }, {
          name: 'fs',
          store: fsStore
        }
      ],
      defaults: ['memory']
    },
    proxySitemap: {
      host: 'https://test.com',
      cache: {
        prefix: 'memory',
        eject: 100000
      }
    },
    proxyEngine: {
      live_mode: false,
      profile: 'test'
    },
    web: {
      express: require('express')
    },
    database: {
      stores: stores,
      models: {
        defaultStore: 'sqlitedev',
        migrate: 'drop'
      }
    },
    policies: {
      // '*': [ 'CheckPermissions.checkRoute' ]
    },
    log: {
      logger: new smokesignals.Logger('debug')
    },
    session: {
      secret: 'proxySitemap'
    }
  }
}

const dbPath = path.resolve(__dirname, './test.sqlite')
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath)
}
const uploadPath = path.resolve(__dirname, './test.uploads.sqlite')
if (fs.existsSync(uploadPath)) {
  fs.unlinkSync(uploadPath)
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
