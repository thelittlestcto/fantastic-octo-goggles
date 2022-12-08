import React from 'react'

import './variables.css'
import './global.css'
import Seo from './seo'
import Navigation from './navigation'
import Footer from './footer'
import { Script } from "gatsby"

<Script id="clarity">
 {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "eulfh7sro3");
  `}
</Script>

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <Seo />
        <Script id="clarity">
        {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "eulfh7sro3");
          `}
        </Script>
        
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
        <Footer />
      </>
    )
  }
}

export default Template
