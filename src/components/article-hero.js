import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import * as styles from './article-hero.module.css'

const Hero = ({image, title, content }) => (
  <div className={styles.hero}>
    <div className={styles.details}> 
    <GatsbyImage alt="" image={image} />
      <h1 className={styles.title}>{title}.</h1>
      {content && (
        <div className={styles.content}>{renderRichText(content)}</div>
      )}
      
    </div>
  </div>
)

export default Hero
