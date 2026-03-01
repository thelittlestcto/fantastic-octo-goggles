import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({
  description = '',
  title,
  image,
  canonicalPath,
  publishDate,
  modifiedDate,
  type = 'website',
  children,
}) => {
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
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
  const canonicalUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : siteUrl
  const ogType = type === 'article' ? 'article' : 'website'

  // JSON-LD structured data
  const jsonLd =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: metaDescription,
          url: canonicalUrl,
          ...(image && { image }),
          ...(publishDate && { datePublished: publishDate }),
          ...(modifiedDate && { dateModified: modifiedDate }),
          author: {
            '@type': 'Person',
            name: 'Alex Shaw',
            url: `${siteUrl}/about/`,
          },
          publisher: {
            '@type': 'Organization',
            name: defaultTitle,
            url: siteUrl,
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: defaultTitle,
          url: siteUrl,
          description: metaDescription,
        }

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={defaultTitle} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width" content="1200" />}
      {image && <meta property="og:image:height" content="630" />}

      {/* Article-specific OG */}
      {type === 'article' && publishDate && (
        <meta property="article:published_time" content={publishDate} />
      )}
      {type === 'article' && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {type === 'article' && (
        <meta property="article:author" content="Alex Shaw" />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@axshaw" />
      <meta name="twitter:site" content="@axshaw" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Font preloads for performance */}
      <link
        rel="preload"
        href="/fonts/Inter-roman.var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {children}
    </>
  )
}

export default Seo
