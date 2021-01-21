import '../global.scss'
import React from 'react'
import LayoutContainer from '../containers/layout'
import {graphql} from 'gatsby'
import Intro from '../components/intro'
import Container from '../components/container'
import {Shape, ShapeWrapper} from '../components/shape'
import styles from './about.module.scss'
import parallax from '../lib/parallax'
import 'gatsby-source-sanity/fragments/imageFragments'
import BlockText from '../components/block-text'
import Figure from '../components/figure'
import {cn} from '../lib/helpers'
import SEO from '../components/seo'
import Layout from '../components/layout'

export const query = graphql`
  query AboutPage {
    sanityAboutPage(_id: {regex: "/(drafts.|)aboutPage/"}) {
      title
      experience {
        _key
        since
        title
        _rawAgency
      }
      skills {
        _key
        title
        _rawDescription
      }
      description
      author {
        image {
          alt
          asset {
            _id
          }
        }
      }
    }
  }
`

const AboutPage = ({data}) => {
  const page = data.sanityAboutPage || {}

  return (
    <LayoutContainer>
      <SEO title="Über Philipp Veller" />
      <Container>
        <ShapeWrapper container clone={<Intro title={page.title} />}>
          <Shape
            shape="rectangle"
            className={cn(styles.shapeRectangleLong, styles.shapeRectangleDynamicWidth)}
            ref={parallax.init([{property: 'transform', speed: 13, value: 'translateY(-%dpx)'}])}
          />
          <Shape
            className={styles.shapeTriangle}
            shape="triangle"
            ref={parallax.init([
              {property: 'transform', speed: 7, value: 'translateY(-%dpx)'},
              {property: 'transform', speed: 3, value: 'translateX(%dpx)'},
            ])}
          />
        </ShapeWrapper>
        <Intro title={page.title}>
          <Figure
            figureClassName={styles.about__image}
            node={page.author.image}
            options={{maxWidth: 400, maxHeight: 400}}
          />
        </Intro>
        <div className="offset-lg-1">
          <div className="row">
            <div className="col-xl-4 order-md-first col-md-6">
              <p className={styles.about__intro}>{page.description}</p>
            </div>
          </div>

          <h2>Erfahrung</h2>
          <ul className={styles.about__experience}>
            {page.experience.map(item => (
              <li key={item._key}>
                <span className="muted">{item.since}</span>
                <br />
                <strong>{item.title}</strong>
                <BlockText blocks={item._rawAgency} />
              </li>
            ))}
          </ul>
          <h2 className={cn(styles.about__subtitle, 'h1')}>Skills</h2>
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <ul className={cn(styles.about__skills, 'row')}>
                {page.skills.map(item => (
                  <li key={item._key} className={cn(styles.about__skill, 'col-lg-6')}>
                    <h3 className="h2">{item.title}</h3>
                    <BlockText blocks={item._rawDescription} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </LayoutContainer>
  )
}

export default AboutPage
