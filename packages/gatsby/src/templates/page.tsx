import React from 'react';
import { graphql, PageProps } from 'gatsby';
import parse from 'html-react-parser';
import '../css/@wordpress/block-library/build-style/style.css';
import '../css/@wordpress/block-library/build-style/theme.css';

import Bio from '../components/bio';
import Layout from '../components/Layout';
import Seo from '../components/seo';

const Page = ({ data: { page } }: PageProps<Queries.PageByIdQuery>) => {
  return (
    <Layout>
      <Seo
        title={page && page.title ? page.title : ''}
        description={page && page.title ? page.title : ''}
      />
      <article
        itemScope
        itemType="http://schema.org/Article"
        className="wp-site-blocks"
      >
        <header>
          <h1
            itemProp="headline"
            className="wp-post-block-post-title mb-4 text-2xl text-orange-500 md:mb-8 md:text-4xl"
          >
            {page && page.title && parse(page.title)}
          </h1>
        </header>

        {page && !!page.content && (
          <div className="entry-content wp-block-post-content has-global-padding is-layout-constrained">
            <section itemProp="articleBody">{parse(page.content)}</section>
          </div>
        )}
      </article>
    </Layout>
  );
};

export default Page;

export const pageQuery = graphql`
  query PageById($id: String!) {
    page: wpPage(id: { eq: $id }) {
      id
      title
      slug
      uri
      date(formatString: "MMMM DD, YYYY")
      content
    }
  }
`;
