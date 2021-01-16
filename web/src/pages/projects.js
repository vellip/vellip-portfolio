import '../global.scss'
import React from 'react'
import Layout from '../components/layout'
import {graphql} from 'gatsby'
import Intro from '../components/intro'
import Container from '../components/container'
import ProjectTeaser from '../components/project-teaser'
import {mapEdgesToNodes} from '../lib/helpers'

export const query = graphql`
  query ProjectsPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
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
  const projects = data?.projects?.edges?.length && mapEdgesToNodes(data.projects)
  return (
    <Layout>
      <Container>
        <Intro title="Projekte und <br/> Case Studies" />
        <div className="row">
          {projects &&
            projects.map(project => (
              <div className="col-lg-6">
                <ProjectTeaser project={project} gridStyle={true} />
              </div>
            ))}
        </div>
      </Container>
    </Layout>
  )
}

export default ProjectsPage
