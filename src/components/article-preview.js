import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'
const ArticlePreview = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  return (
    <Container>
      <ul className={styles.articleList}>
        {posts.map((post, index) => {
          return (
            <li key={post.slug}>
              <div className={styles.details}>
                {post.heroImage?.gatsbyImage && (
                  <Link to={`/blog/${post.slug}`} className={styles.link}>
                    <GatsbyImage 
                      alt={post.title} 
                      image={post.heroImage.gatsbyImage} 
                      loading={index === 0 ? "eager" : "lazy"} 
                      fetchPriority={index === 0 ? "high" : "auto"} 
                    />
                  </Link>
                )}
                <span className={styles.subdetails}>
                <Link to={`/blog/${post.slug}`} className={styles.link}>
                <h2 className={styles.title}>{post.title}</h2>
                </Link>
                  {post.description?.raw && renderRichText(post.description)}
                  <div className={styles.meta}>
                  <small className="meta">{post.publishDate}</small>
                  <Tags tags={post.category ? [post.category, ...(post.tags || [])] : post.tags} />
                  
                </div>
                </span>
                
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default ArticlePreview
