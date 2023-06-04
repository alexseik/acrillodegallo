import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import '../css/@wordpress/block-library/build-style/style.css';
import '../css/@wordpress/block-library/build-style/theme.css';

import Bio from '../components/bio';
import Layout from '../components/Layout';
import Seo from '../components/seo';

const BlogPostTemplate = ({
  data: { previous, next, post },
}: PageProps<Queries.BlogPostByIdQuery>) => {
  const featuredImage = {
    data: post?.featuredImage?.node?.localFile?.childImageSharp
      ?.gatsbyImageData,
    alt: post?.featuredImage?.node?.altText || ``,
  };

  return (
    <Layout>
      <Seo
        title={post && post.title ? post.title : ''}
        description={post && post.excerpt ? post.excerpt : ''}
      />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post && post.title && parse(post.title)}</h1>

          <p>{post && post.date}</p>

          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.data && (
            <GatsbyImage
              image={featuredImage.data}
              alt={featuredImage.alt}
              style={{ marginBottom: 50 }}
            />
          )}
        </header>

        {post && !!post.content && (
          <section itemProp="articleBody">{parse(post.content)}</section>
        )}

        <hr />

        <footer>
          <Bio />
        </footer>
      </article>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && previous.uri && (
              <Link to={previous.uri} rel="prev">
                ← {previous.title && parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && next.uri && (
              <Link to={next.uri} rel="next">
                {next.title && parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
