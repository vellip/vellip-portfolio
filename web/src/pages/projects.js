import '../global.scss'
import React, {useEffect} from 'react'
import LayoutContainer from '../containers/layout'
import {graphql} from 'gatsby'
import Intro from '../components/intro'
import Container from '../components/container'
import ProjectTeaser from '../components/project-teaser'
import {mapEdgesToNodes} from '../lib/helpers'
import {Shape, ShapeWrapper} from '../components/shape'
import styles from './projects.module.scss'
import parallax from '../lib/parallax'
import SEO from '../components/seo'

export const query = graphql`
  query ProjectsPageQuery {
    projects: allSanityProject(
      limit: 6
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const ProjectsPage = ({data}) => {
  const projects = data.projects.edges.length && mapEdgesToNodes(data.projects)

  return (
    <LayoutContainer>
      <SEO title="Entwickelte Webseiten und WebApps" />
      <Container>
        <Shape
          shape="circle"
          className={styles.shapeCircle}
          ref={parallax.init([
            {speed: 17, value: 'translateX(-%dpx)', delay: 90},
            {speed: 7, value: 'translateY(%dpx)', delay: 90},
          ])}
        />
        <Shape
          shape="rectangle"
          className={styles.shapeRectangle}
          ref={parallax.init([{speed: 3, value: 'translateY(-%dpx)', delay: 100}])}
        />
        <Intro title="Projekte und <br/> Case Studies" />
        <div className="row">
          {projects &&
            projects.map(project => (
              <div className="col-lg-6" key={project.id}>
                <ProjectTeaser project={project} gridStyle={true} />
              </div>
            ))}
        </div>
      </Container>
    </LayoutContainer>
  )
}

export default ProjectsPage
