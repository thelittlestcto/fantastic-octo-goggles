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
          name
          title
          twitter
          github
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

  const personName = defaultOgImage?.name || 'Alex Shaw'
  const personTitle = defaultOgImage?.title || 'Engineering Leader & CTO'
  const sameAsLinks = []
  if (defaultOgImage?.twitter) sameAsLinks.push(defaultOgImage.twitter)
  if (defaultOgImage?.github) sameAsLinks.push(defaultOgImage.github)
  if (sameAsLinks.length === 0) {
    sameAsLinks.push('https://uk.linkedin.com/in/axshaw')
    sameAsLinks.push('https://twitter.com/axshaw')
  }

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
            name: personName,
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
          '@graph': [
            {
              '@type': 'WebSite',
              name: defaultTitle,
              url: siteUrl,
              description: metaDescription,
            },
            {
              '@type': 'Person',
              name: personName,
              jobTitle: personTitle,
              url: siteUrl,
              sameAs: sameAsLinks,
              ...(ogImage && { image: ogImage }),
            }
          ]
        }

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="preconnect" href="https://images.ctfassets.net" />

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
