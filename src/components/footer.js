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
    
  </nav>
  <div className={styles.footsie}>
  
  <ul className={styles.navigation}>
    <li className={styles.navigationItem}>  
    <Link to="/agile-principles/" activeClassName="active">
            agile principles
    </Link>
    </li>
    <li className={styles.navigationItem}>  
    <Link to="/agile-principles/" activeClassName="active">
            agile principles
    </Link>
    </li>
    <li className={styles.navigationItem}>  
    <Link to="/agile-principles/" activeClassName="active">
            agile principles
    </Link>
    </li>
  </ul>
  </div>
  </Container>
)

export default Footer
