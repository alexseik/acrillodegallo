/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const graphqlTypegen = true;
export const plugins = [
  'gatsby-plugin-sass',
  'gatsby-plugin-postcss',
  {
    /**
     * First up is the WordPress source plugin that connects Gatsby
     * to your WordPress site.
     *
     * visit the plugin docs to learn more
     * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
     *
     */
    resolve: `gatsby-source-wordpress`,
    options: {
      // the only required plugin option for WordPress is the GraphQL url.
      url: process.env.WPGRAPHQL_URL || 'http://localhost/graphql',
      verbose: true,
      schema: {
        perPage: 200,
        timeout: 1000000,
      },
      debug: {
        preview: true,
        graphql: {
          showQueryVarsOnError: true,
          showQueryOnError: true,
        },
      },
    },
  },

  /**
   * We need this plugin so that it adds the "File.publicURL" to our site
   * It will allow us to access static url's for assets like PDF's
   *
   * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
   */
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `assets`,
      path: `${__dirname}/content/assets`,
    },
  },

  /**
   * The following two plugins are required if you want to use Gatsby image
   * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
   * if you're curious about it.
   */
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-image`,
  {
    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Asociación Cultural Rillo de Gallo`,
      short_name: `A.C Rillo de Gallo`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `content/assets/logo-acrillo-small.png`,
    },
  },

  // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
  `gatsby-plugin-react-helmet`,
  /**
   * this (optional) plugin enables Progressive Web App + Offline functionality
   * To learn more, visit: https://gatsby.dev/offline
   */
  // `gatsby-plugin-offline`,
];
