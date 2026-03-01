import React from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const posts = this.props.data?.allContentfulBlogPost?.nodes

    return (
      <Layout location={this.props.location}>
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default RootIndex

export const Head = () => <Seo title="Blog" canonicalPath="/blog/" />

export const pageQuery = graphql`
  query BlogQuery {
    allContentfulBlogPost(sort: { publishDate: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
      }
    }
  }
`
