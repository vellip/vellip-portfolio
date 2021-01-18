import '../global.scss'
import React from 'react'
import {graphql} from 'gatsby'
import {mapEdgesToNodes, filterOutDocsWithoutSlugs, filterOutDocsPublishedInTheFuture} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Intro from '../components/intro'
import ProjectTeaser from '../components/project-teaser'
import {Shape, ShapeWrapper} from '../components/shape'
import './index.module.scss'

export const query = graphql`
  query IndexPageQuery {
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

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : []
  console.log(projectNodes)
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <ShapeWrapper container clone={<Intro pre="Hallo!" title="Ich bin Philipp, <br/> Webentwickler aus Berlin" />}>
          <Shape shape="circle" />
          <Shape shape="triangle" />
          <Shape shape="squiggle" />
        </ShapeWrapper>
        <Shape shape="rectangle" />
        <Intro pre="Hallo!" title="Ich bin Philipp, <br/> Webentwickler aus Berlin" />
      </Container>
      {projectNodes &&
        projectNodes.map((item, index) => <ProjectTeaser align={index % 2 === 0 ? 'left' : 'right'} project={item} />)}
    </Layout>
  )
}

export default IndexPage
