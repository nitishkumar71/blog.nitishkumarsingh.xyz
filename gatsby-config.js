const postCssPresetEnv = require(`postcss-preset-env`)
const postCSSNested = require('postcss-nested')
const postCSSUrl = require('postcss-url')
const postCSSImports = require('postcss-import')
const cssnano = require('cssnano')
const postCSSMixins = require('postcss-mixins')

module.exports = {
  siteMetadata: {
    title: `Nitishkumar's Blog Home`,
    description: `Let's talk about everything in technology`,
    copyrights: '',
    author: `Nitishkumar Singh`,
    logo: {
      src: '/myAvatar.svg',
      alt: 'A lot of lengthy talks!',
    },
    logoText: `A lot of lengthy talks!`,
    defaultTheme: 'dark',
    postsPerPage: 10,
    showMenuItems: 2,
    menuMoreText: 'Show more',
    siteUrl: 'https://blog.nitishkumarsingh.xyz',
    rssFeed: {
      src: '/rss-feed-2.svg',
      alt: 'RSS Feed',
      path: '/rss.xml'
    },
    mainMenu: [
      {
        title: 'About',
        path: 'https://twitter.com/Nitishkumar071',
        target: '_blank',
        img: '/myAvatar.svg'
      },
      {
        title: 'RSS',
        path: '/rss.xml',
        target: '_blank',
        img: '/rss-feed-2.svg'
      }
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        htmlFavicon: "src/images/myAvatar.svg",
        enableIdentityWidget: false
      },
    },
    `babel-preset-gatsby`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postCSSUrl(),
          postCSSImports(),
          postCSSMixins(),
          postCSSNested(),
          postCssPresetEnv({
            importFrom: 'src/styles/variables.css',
            stage: 1,
            preserve: false,
          }),
          cssnano({
            preset: 'default',
          }),
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              // replace "UA-XXXXXXXXX-X" with your own Tracking ID
              trackingId: process.env.GA_TRACKING_ID
            },
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `nitishkumar-blog`,
        short_name: `nitishkumar-blog`,
        start_url: `/`,
        background_color: `#292a2d`,
        theme_color: `#292a2d`,
        display: `minimal-ui`,
        icon: `src/images/myAvatar.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      }
    },
    `gatsby-plugin-nprogress`,
    `gatsby-plugin-polyfill-io`,
    'gatsby-plugin-draft',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Nitishkumar's Blog",
          },
        ],
      },
    }
    // {
    //   resolve: "gatsby-plugin-guess-js",
    //   options: {
    //     // Find the view id in the GA admin in a section labeled "views"
    //     GAViewID: process.env.GA_TRACKING_ID,
    //     minimumThreshold: 0.03,
    //     // Set Google Analytics jwt with Google Service Account email and private key
    //     jwt: {
    //       client_email: `GOOGLE_SERVICE_ACCOUNT_EMAIL`,
    //       private_key: `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`,
    //     },
    //     // The "period" for fetching analytic data.
    //     period: {
    //       startDate: new Date("2018-1-1"),
    //       endDate: new Date(),
    //     }
    //   }
    // }
  ],
}
