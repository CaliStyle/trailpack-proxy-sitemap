# trailpack-proxy-sitemap

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Sitemap for Proxy Engine. Creates a sitemap.xml available at `/sitemap.xml`, and rebuilds on a cron schedule.

## Install

```sh
$ npm install --save trailpack-proxy-sitemap
```

## Configure

```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-proxy-sitemap')
  ]
}
```

```js
// config/proxySitemap.js
module.exports = {
  host: 'https://<hostname>',
  cache: 1000000
}
```

## Creating a Sitemap
Sitemaps are created in the `/api/sitemaps`. Create one or many methods that return a Promise and array like the one below.  Under the hood, Proxy Sitemap uses [Sitemap](https://github.com/ekalinin/sitemap.js) for more examples on acceptable returns.

The sitemap is broken into methods so that it can deliver multiple sitemaps if necessary and break them up accordingly.

```js
const Sitemap = require('trailpack-proxy-sitemap').Sitemap

module.exports = class TestSitemap extends Sitemap {
  test() {
    return Promise.resolve([
      { url: '/page-1/',  changefreq: 'daily', priority: 0.3 },
      { url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 },
      { url: '/page-3/', img: 'http://urlTest.com' }
    ])
  }
}
```

[npm-image]: https://img.shields.io/npm/v/trailpack-proxy-sitemap.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-proxy-sitemap
[ci-image]: https://img.shields.io/circleci/project/github/CaliStyle/trailpack-proxy-sitemap/master.svg
[ci-url]: https://circleci.com/gh/CaliStyle/trailpack-proxy-sitemap/tree/master
[daviddm-image]: http://img.shields.io/david/CaliStyle/trailpack-proxy-sitemap.svg?style=flat-square
[daviddm-url]: https://david-dm.org/CaliStyle/trailpack-proxy-sitemap
[codeclimate-image]: https://img.shields.io/codeclimate/github/CaliStyle/trailpack-proxy-sitemap.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/CaliStyle/trailpack-proxy-sitemap

