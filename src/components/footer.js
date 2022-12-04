import React from 'react'
import { Link } from 'gatsby'
import Container from './container'
import * as styles from './footer.module.css'

const Footer = () => (
  <Container as="footer">
    <hr></hr>
    <nav role="navigation" className={styles.container} aria-label="Main">
    <Link to="/" className={styles.logoLink}>
      <span className={styles.logo} />
    </Link>
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName="active">
          Home
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/" activeClassName="active">
          Blog
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/about/" activeClassName="active">
          About
        </Link>
      </li>
    </ul>
  </nav>
  <div className={styles.footsie}>
    hello worlds
  </div>
  </Container>
)

export default Footer
