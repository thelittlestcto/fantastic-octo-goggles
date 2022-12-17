import React from 'react'
import Container from './container-footer'
import * as styles from './footer.module.css'
import Newsletter from './newsletter'

const Footer = (props) => (
  <Container as="footer">
    <div className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerGridItem}>
        &nbsp;
        </div>
        <div className={styles.footerGridItem}>

        </div>
        <div className={styles.footerGridItem}>
        &nbsp;
        </div>
        <div className={styles.footerGridItem}>
        &nbsp;
        </div>
        <div className={styles.footerGridItemBig}>
        <div className={styles.contactIconsContainer}>
            <a href="mailto:alex@thelittlescto.com">
            <svg  width="40" height="42" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            </a>
            <a href="hhttps://uk.linkedin.com/in/axshaw">
            <svg  width="40" height="42" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
            </a>
            
            <a href="https://twitter.com/axshaw">
            <svg  width="40" height="42" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
            </a>
          </div>
        </div>
        <div className={styles.footerGridItemBigLinks}>
          <Newsletter display={props.newsletter || 'on'}></Newsletter>
        </div>
        <div className={styles.footerGridItemBigLinks}>
           <a className={styles.boyneylink}  href="https://www.boyney.io/">Site & me inspired by @boyney123 </a>
        </div>
      </div>
  </div>
  </Container>
)

export default Footer
