import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import * as styles from './hero.module.css'

const Hero = ({image, title, content }) => (
  <div className={styles.hero}>
    <div className={styles.details}> 
    <GatsbyImage alt="" image={image} />
      <h1 className={styles.title}>{title}</h1>
      {content && (
        <div className={styles.content}>{renderRichText(content)}</div>
      )}
      <a href="https://twitter.com/axshaw?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @axshaw</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
       <br /><br /><script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script> 
    </div>
  </div>
)

export default Hero
