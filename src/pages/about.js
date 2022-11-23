import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import PersonPreview from '../components/person-preview'

class PersonIndex extends React.Component {
  render() {
    const people = get(this, 'props.data.allContentfulPerson.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="About" />
        <Hero title="About" />
        <PersonPreview people={people} />
      </Layout>
    )
  }
}

export default PersonIndex

export const pageQuery = graphql`
  query PersonIndexQuery {
    allContentfulPerson {
      nodes {
        shortBio {
          raw
        }
        twitter
        name
        company
        email
        sys {
          type
          revision
        }
        title
        image {
          gatsbyImage
        }
      }
    }
  }
`
