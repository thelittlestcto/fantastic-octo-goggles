import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    

    return (
      <Layout location={this.props.location}>
        <Hero
         
          title="Agile"
          content=""
        />
       <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
query AgileQuery {
  allContentfulBlogPost(
    sort: {fields: [publishDate], order: DESC}
    filter: {tags: {eq: "agile"}}
  ) {
    nodes {
      title
      slug
      publishDate(formatString: "MMMM Do, YYYY")
      tags
      heroImage {
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 424, height: 212)
      }
      description {
        raw
      }
    }
  }
  allContentfulPerson(filter: {contentful_id: {eq: "15jwOBqpxqSAOy2eOO4S0m"}}) {
    nodes {
      name
      shortBio {
        raw
      }
      title
      heroImage: image {
        gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 180)
      }
    }
  }
}
`
