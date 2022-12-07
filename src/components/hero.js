import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import * as styles from './hero.module.css'
const Hero = ({isWelcome, image, title, content }) => (
  <div className={styles.hero}>
    <div className={styles.details}> 
    <GatsbyImage alt="" image={image} />
      <h1 className={styles.title}>
        {
       isWelcome && <b>Hi I'm </b> 
        }
          {title}
          {
          isWelcome && <b>. </b> 
          }
          </h1>
      {content && (
        <div className={styles.content}>{renderRichText(content)}</div>
      )}
      
    </div>
  </div>
)

export default Hero
