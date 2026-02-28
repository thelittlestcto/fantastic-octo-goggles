import React from 'react'

import './variables.css'
import './global.css'

import Navigation from './navigation'
import Footer from './footer'
import { Script } from "gatsby"

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <Script id="gtag_l" src="https://www.googletagmanager.com/gtag/js?id=G-CWS43VLQ2P"></Script>
        <Script id="gtag">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-CWS43VLQ2P');
          `}
        </Script>
        <Navigation />
        <main>{children}</main>
        <Footer newsletter={this.props.newsletter} />
      </>
    )
  }
}

export default Template
