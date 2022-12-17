require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "The Littlest CTO",
    description: "Things to know about How to be a successful CTO",
  },
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST
      },
    },
    {
      resolve: `gatsby-plugin-clarity`,
      options: {
      clarity_project_id: 'eulfh7sro3',
      // Boolean value for enabling clarity while developing
      // true will enable clarity tracking code on both development and production environments
      // false will enable clarity tracking code on production environment only
      enable_on_dev_env: false
      },
   }
  ],
};
