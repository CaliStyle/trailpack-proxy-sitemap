'use strict'

const Cron = require('trailpack-proxy-engine').Cron

module.exports = class SitemapsCron extends Cron {
  build() {
    // Every Week at 5 minutes past midnight on the last day of the week build the sitemap.xml
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 5
    rule.hour = 0
    rule.dayOfWeek = 6
    // Schedule the recurring job
    this.scheduler.scheduleJob('SitemapsCron.build', rule, () => {
      this.app.services.ProxySitemapService.build()
        .catch(err => {
          this.app.log.error(err)
        })
    })
  }
}
