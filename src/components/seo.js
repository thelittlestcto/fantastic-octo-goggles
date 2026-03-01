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
  const { site, defaultOgImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
        defaultOgImage: contentfulPerson(name: { eq: "Alex" }) {
          image {
            resize(width: 1200, height: 630) {
              src
            }
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
  const fallbackImage = defaultOgImage?.image?.resize?.src
    ? `https:${defaultOgImage.image.resize.src}`
    : undefined
  const ogImage = image || fallbackImage

  // JSON-LD structured data
  const jsonLd =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: metaDescription,
          url: canonicalUrl,
          ...(ogImage && { image: ogImage }),
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
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}

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
      {ogImage && <meta name="twitter:image" content={ogImage} />}

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
