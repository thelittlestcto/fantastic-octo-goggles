import React from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const posts = this.props.data?.allContentfulBlogPost?.nodes
    const [author] = this.props.data?.allContentfulPerson?.nodes ?? []

    return (
      <Layout location={this.props.location}>
        <Hero
          image={author?.heroImage?.gatsbyImage}
          title={author?.name}
          subtitle={author?.title}
          content={author?.shortBio}
          isWelcome={true}
        />
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default RootIndex

export const Head = ({ data }) => {
  const [author] = data?.allContentfulPerson?.nodes ?? []
  return <Seo title={author?.title || "Engineering Leadership"} canonicalPath="/" />
}

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { publishDate: DESC }) {
      nodes {
        title
        slug
        seoDescription
        category
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImage(
            layout: CONSTRAINED
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
    allContentfulPerson(filter: { name: { eq: "Alex" } }, limit: 1) {
      nodes {
        name
        shortBio {
          raw
        }
        title
        heroImage: image {
          gatsbyImage(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 180
          )
        }
      }
    }
  }
`
