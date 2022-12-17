import React from 'react'
import Layout from '../components/layout'

class RootIndex extends React.Component {
    render() {
      return (
        <Layout location={this.props.location} newsletter='off'>
         
        </Layout>
      )
    }
  }
  export default RootIndex