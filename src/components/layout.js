import React from 'react'

import './variables.css'
import './global.css'

import Navigation from './navigation'
import Footer from './footer'

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <Navigation />
        <main>{children}</main>
        <Footer newsletter={this.props.newsletter} />
      </>
    )
  }
}

export default Template
