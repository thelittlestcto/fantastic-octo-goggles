import React from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import PersonPreview from '../components/person-preview'

class PersonIndex extends React.Component {
  render() {
    const people = this.props.data?.allContentfulPerson?.nodes ?? []
    const [author] = people

    return (
      <Layout location={this.props.location}>
        <Hero
          isWelcome={true}
          image={author?.heroImage?.gatsbyImage}
          title={author?.name}
          content={author?.shortBio}
        />
        <PersonPreview people={people} />
      </Layout>
    )
  }
}

export default PersonIndex

export const Head = () => (
  <Seo
    title="About"
    canonicalPath="/about/"
    description="Alex Shaw is a CTO with 20+ years of technology leadership experience. Practical insights on engineering leadership."
  />
)

export const pageQuery = graphql`
  query PersonIndexQuery {
    allContentfulPerson(filter: { name: { eq: "Alex" } }, limit: 1) {
      nodes {
        shortBio {
          raw
        }
        longBio {
          raw
        }
        twitter
        name
        company
        email
        title
        heroImage: imageAlternative {
          gatsbyImage(
            placeholder: BLURRED
            width: 180
          )
        }
      }
    }
  }
`
