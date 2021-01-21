import React from 'react'
import hStyles from './header.module.scss'
import fStyles from './footer.module.scss'
import styles from './layout.module.scss'
import {Link} from 'gatsby'
import {cn, rnItem} from '../lib/helpers'
import Container from './container'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedinIn, faMediumM, faTwitter} from '@fortawesome/free-brands-svg-icons'

const links = [
  {label: 'Projekte', href: '/projects'},
  {label: 'About', href: '/about'},
  {label: 'Blog', href: 'https://medium.com/@vellip', target: '_blank'},
]

const Header = ({siteTitle}) => (
  <header className={hStyles.header}>
    <nav>
      <ul className={hStyles.header__list}>
        <li className={cn(hStyles.header__listItem, hStyles.header__listItemHome)}>
          <Link to="/" className={hStyles.header__link} activeClassName={hStyles.header__linkActive}>
            {siteTitle}
          </Link>
        </li>
        {links.map((item, index) => (
          <li key={item.href} className={hStyles.header__listItem}>
            <Link
              to={item.href}
              className={hStyles.header__link}
              target={item.target || '_self'}
              activeClassName={hStyles.header__linkActive}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

const textMe = rnItem(['Schreib mir mal.', 'Noch Fragen?', 'Lass uns zusammenarbeiten!'])
const callMe = rnItem(['Bisschen plaudern?', 'Lust zu quatschen?', 'Noch Fragen?'])

const Footer = () => (
  <footer className={fStyles.footer} itemScope itemType="http://schema.org/Person">
    <Container>
      <div className={fStyles.footer__section}>
        <h2 className={fStyles.footer__label}>{textMe}</h2>
        <a href="mailto:mail@vellip.de?subject=Hallöchen" itemProp="email" className={fStyles.footer__value}>
          mail@vellip.de
        </a>
      </div>
      <div className={fStyles.footer__section}>
        <h2 className={fStyles.footer__label}>{callMe}</h2>
        <a href="tel:+491703872190" itemProp="telephone" className={fStyles.footer__value}>
          +49 (0)170 38 72 190
        </a>
      </div>
      <div className={cn(fStyles.footer__section, fStyles.footer__sectionRight)}>
        <nav>
          <ul className={fStyles.footer__list}>
            <li>
              <a href="https://medium.com/@vellip" target="_blank">
                <FontAwesomeIcon icon={faMediumM} aria-label="Medium Profil" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/vellip_" target="_blank">
                <FontAwesomeIcon icon={faTwitter} aria-label="Twitter Profil" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/philipp-veller-webdev/" target="_blank">
                <FontAwesomeIcon icon={faLinkedinIn} aria-label="LinkedIn Profil" />
              </a>
            </li>
            <li>
              <a href="https://github.com/vellip" target="_blank">
                <FontAwesomeIcon icon={faGithub} aria-label="Github Profil" />
              </a>
            </li>
          </ul>
          <Link to="/page/impressum-datenschutz">Impressum & Datenschutz</Link>
          <address className={fStyles.footer__valueSmall}>
            <span itemProp="name">Philipp Veller</span> <br />
            <span itemProp="jobTitle">Webentwickler</span> <br />
            <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">Berliner Str 66</span> <br />
              <span itemProp="postalCode">13189</span>&nbsp;
              <span itemProp="addressLocality">Berlin</span>
            </span>
          </address>
        </nav>
      </div>
    </Container>
  </footer>
)

const Layout = ({children, siteTitle}) => (
  <>
    <Header siteTitle={siteTitle} />
    <main className={styles.content}>{children}</main>
    <Footer />
  </>
)

export default Layout
