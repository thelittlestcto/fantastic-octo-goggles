import React from 'react'
import Layout from '../components/layout'
import Hero from '../components/hero-singlepage'

class RootIndex extends React.Component {
    render() {
      return (
        <Layout location={this.props.location} newsletter='off'>
          <Hero
          title='Thank You!'
          content=''
        />
        
        
        </Layout>
      )
    }
  }
  export default RootIndex