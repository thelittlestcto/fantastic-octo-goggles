import React from 'react'
import Layout from '../components/layout'

class RootIndex extends React.Component {
    render() {
      return (
        <Layout location={this.props.location}>
         Hey - its not here, whatever you were looking for.
        </Layout>
      )
    }
  }
  export default RootIndex