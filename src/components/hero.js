import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import * as styles from './hero.module.css'
console.log(window.location.pathname);

const Hero = ({image, title, content }) => (
  <div className={styles.hero}>
    <div className={styles.details}> 
    <GatsbyImage alt="" image={image} />
      <h1 className={styles.title}>
        {
        window.location.pathname === '/' && <b>Hi I'm </b> 
        }
          {title}.</h1>
      {content && (
        <div className={styles.content}>{renderRichText(content)}</div>
      )}
      
    </div>
  </div>
)

export default Hero
