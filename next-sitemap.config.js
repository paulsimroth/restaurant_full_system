// next-sitemap config

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NETX_PUBLIC_SITE_URL || 'https://example.com',
  generateRobotsTxt: true, // (optional)
  outDir: "./out",

  /**
   * @param disallow set all routes which should not be indexed
   */
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/imprint', '/data', '/login', '/dashboard/:path*']
      },
    ],
  }
};