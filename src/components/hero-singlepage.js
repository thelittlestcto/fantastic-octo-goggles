import React from 'react'

import * as styles from './hero-singlepage.module.css'
const Hero = ({title, content }) => (
  <div className={styles.hero}>
    <div className={styles.details}> 
    
      <h1 className={styles.title}>
          {title}
          </h1>
      {content && (
        <div className={styles.content}>{content}</div>
      )}
    </div>
  </div>
)

export default Hero
