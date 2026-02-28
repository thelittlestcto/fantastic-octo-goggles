import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ description = '', title, image, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const siteUrl = site.siteMetadata?.siteUrl

  return (
    <>
      <html lang="en" />
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      {image && <meta name="image" content={image} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      {image && <meta property="og:image" content={image} />}
      {siteUrl && <meta property="og:url" content={siteUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@axshaw" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {image && <meta name="twitter:image" content={image} />}
      {children}
    </>
  )
}

export default Seo
