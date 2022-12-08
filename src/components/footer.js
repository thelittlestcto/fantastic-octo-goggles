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
    <Link to="https://www.boyney.io/" activeClassName="active">
            Site & me inspired by David Boyne
    </Link>
    </li>
  </ul>
  </div>
  <div>
    <div className={styles.contactIconsContainer}>
      <a href="mailto:alex@thelittlescto.com">
      <svg  width="22" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
      </a>
      <a href="hhttps://uk.linkedin.com/in/axshaw">
      <svg  width="22" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a>
      
      <a href="https://twitter.com/axshaw">
      <svg  width="22" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></a>
      <a href="https://hachyderm.io/@axshaw"><svg width="22" height="24" xmlns="http://www.w3.org/2000/svg"><g stroke="null"><path fill="#3088d4" d="M21.128 14.016c-.304 1.565-2.724 3.277-5.503 3.609-1.449.173-2.875.332-4.396.262-2.488-.114-4.452-.594-4.452-.594 0 .242.015.473.045.688.324 2.456 2.435 2.603 4.435 2.672 2.018.069 3.816-.498 3.816-.498l.082 1.825s-1.411.758-3.926.898c-1.388.076-3.11-.035-5.115-.566C1.764 21.16 1.016 16.523.9 11.818.866 10.421.888 9.104.888 8.002.888 3.19 4.04 1.78 4.04 1.78 5.63 1.05 8.357.743 11.192.72h.07c2.835.023 5.564.33 7.153 1.06 0 0 3.153 1.41 3.153 6.222 0 0 .039 3.55-.44 6.014"></path><path fill="#fff" d="M17.85 8.375v5.826H15.54V8.546c0-1.192-.501-1.797-1.504-1.797-1.11 0-1.665.718-1.665 2.137v3.095h-2.294V8.886c0-1.42-.556-2.137-1.665-2.137-1.003 0-1.505.605-1.505 1.797v5.655H4.6V8.375c0-1.19.303-2.137.912-2.837.628-.7 1.45-1.059 2.471-1.059 1.181 0 2.076.454 2.667 1.362l.575.964.575-.964c.591-.908 1.485-1.362 2.666-1.362 1.021 0 1.844.36 2.471 1.06.61.7.913 1.645.913 2.836z"></path></g></svg>
      </a></div>
    </div>
  
  </Container>
)

export default Footer
