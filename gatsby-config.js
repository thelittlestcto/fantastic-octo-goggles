require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "The Littlest CTO",
    description: "Practical insights on engineering leadership, from a CTO who's been there.",
    siteUrl: "https://thelittlestcto.com",
  },
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => "https://thelittlestcto.com",
        resolvePages: ({ allSitePage: { nodes: allPages } }) => allPages,
        serialize: ({ path }) => ({
          url: path,
          changefreq: path === '/' ? 'weekly' : 'monthly',
          priority: path === '/' ? 1.0 : path.startsWith('/blog/') ? 0.8 : 0.6,
        }),
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST
      },
    },

  ],
};
