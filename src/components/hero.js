import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import * as styles from './hero.module.css'
const Hero = ({isWelcome, image, title, subtitle, content }) => (
  <div className={styles.hero}>
      <div className={styles.heroHolder}>
        
          <div className={styles.imageWrapper}>
            <GatsbyImage alt={title ? `Portrait of ${title}` : ""} image={image} loading="eager" fetchPriority="high" />
        </div>
        <div className={styles.details}> 
        
          <h1 className={styles.title}>
            {
          isWelcome && <b>Hi, I'm </b> 
            }
              {title}
              {
              isWelcome && <b>. </b> 
              }
              </h1>
          {subtitle && (
            <h2 className={styles.subtitle} style={{ fontSize: '1.5rem', fontWeight: 500, margin: '0 0 10px', color: '#fff' }}>{subtitle}</h2>
          )}
          {content && (
            <div className={styles.content}>{renderRichText(content)}</div>
          )}
        </div>  
    </div>
  </div>
)

export default Hero
