// next-sitemap config

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://example.com',
    generateRobotsTxt: true, // (optional)
    outDir: "./out",

    robotsTxtOptions: {
        policies: [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/imprint', '/data']
          },
        ],
    }
};