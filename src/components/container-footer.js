import React from 'react'

const Container = ({ children, as = 'div' }) => {
  const Tag = as

  return (
    <Tag
      style={{
        maxWidth: '100%',
        margin: '0 0',
        padding: '0',
      }}
    >
      {children}
    </Tag>
  )
}

export default Container
