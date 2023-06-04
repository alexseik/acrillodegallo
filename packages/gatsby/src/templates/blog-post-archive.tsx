import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import parse from 'html-react-parser';

import Bio from '../components/bio';
import Layout from '../components/Layout';
import Seo from '../components/seo';

const BlogIndex = ({
  data,
  pageContext,
}: PageProps<Queries.WordPressPostArchiveQuery>) => {
  const posts = data.allWpPost.nodes;

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    );
  }

  return (
    <Layout isHomePage>
      <Seo title="All posts" />

      <Bio />

      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.title;

          return (
            <li key={post.uri}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.uri ? post.uri : ''} itemProp="url">
                      <span itemProp="headline">{title && parse(title)}</span>
                    </Link>
                  </h2>
                  <small>{post.date}</small>
                </header>
                <section itemProp="description">
                  {post.excerpt && parse(post.excerpt)}
                </section>
              </article>
            </li>
          );
        })}
      </ol>

      {(pageContext as any).previousPagePath && (
        <>
          <Link to={(pageContext as any).previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {(pageContext as any).nextPagePath && (
        <Link to={(pageContext as any).nextPagePath}>Next page</Link>
      )}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(sort: { date: DESC }, limit: $postsPerPage, skip: $offset) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
      }
    }
  }
`;
