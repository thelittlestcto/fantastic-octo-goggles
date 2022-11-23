import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from './container'
import * as styles from './person-preview.module.css'

const PersonPreview = ({ people }) => {
  if (!people) return null
  if (!Array.isArray(people)) return null

  return (
    <Container>
      
      <ul className={styles.articleList}>
        {people.map((person) => {
          return (
            <li key={person.name}>
              <GatsbyImage alt="" image={person.image.gatsbyImage} />
              <h1>{person.name}</h1>
              <h2>{person.title}</h2>
              <h3>{person.twitter}</h3>
              <div>
                {person.shortBio?.raw && renderRichText(person.shortBio)}
              </div>
              <div className={styles.meta}>
                <small className="meta">{person.name}</small>
               
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default PersonPreview