import type { GatsbyNode, CreatePagesArgs } from "gatsby"
import path from "path"
import chunk from "lodash/chunk"

export const createPages: GatsbyNode["createPages"] = async gatsbyUtilities => {
  const posts = await getPosts(gatsbyUtilities)
  if (!posts.length) {
    return
  }
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })
  await createBlogPostArchive({ posts, gatsbyUtilities })
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({
  posts,
  gatsbyUtilities,
}: {
  posts: any
  gatsbyUtilities: CreatePagesArgs
}) =>
  Promise.all(
    posts.map(
      ({ previous, post, next }: { previous: any; post: any; next: any }) =>
        // createPage is an action passed to createPages
        // See https://www.gatsbyjs.com/docs/actions#createPage for more info
        gatsbyUtilities.actions.createPage({
          // Use the WordPress uri as the Gatsby page path
          // This is a good idea so that internal links and menus work 👍
          path: post.uri,

          // use the blog post template as the page component
          component: path.resolve(`./src/templates/blog-post.js`),

          // `context` is available in the template as a prop and
          // as a variable in GraphQL.
          context: {
            // we need to add the post id here
            // so our blog post template knows which blog post
            // the current page is (when you open it in a browser)
            id: post.id,

            // We also use the next and previous id's to query them and add links!
            previousPostId: previous ? previous.id : null,
            nextPostId: next ? next.id : null,
          },
        })
    )
  )

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({
  posts,
  gatsbyUtilities,
}: {
  posts: any
  gatsbyUtilities: CreatePagesArgs
}) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    query WPPostArchive {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = (graphqlResult.data as any).wp.readingSettings

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = (page: number) => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/` : `/blog/${page}`
        }

        return ""
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }: CreatePagesArgs) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { date: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return (graphqlResult.data as any).allWpPost.edges
}
