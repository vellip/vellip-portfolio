import '../global.scss'
import React, {useEffect} from 'react'
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
import parallax from '../lib/parallax'

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

  useEffect(() => {
    return () => {
      parallax.remove()
    }
  }, [])

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : []
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
          <Shape
            shape="circle"
            ref={parallax.init([
              {speed: 17, value: 'translateX(-%dpx)', delay: 90},
              {speed: 7, value: 'translateY(%dpx)', delay: 90},
            ])}
          />
          <Shape shape="triangle" ref={parallax.init([{speed: 3, value: 'rotate(-%ddeg)', delay: 30, end: 180}])} />
          <Shape
            shape="squiggle"
            ref={parallax.init([
              {property: 'stroke-dashoffset', speed: 20, value: '%dpx', start: 1779, end: 2740, delay: 100},
            ])}
          />
        </ShapeWrapper>
        <Shape
          shape="rectangle"
          ref={parallax.init([
            {speed: 0.5, value: 'scaleY(%d)', start: 1, end: 3},
            {speed: 6, value: 'translateY(-%dpx)', end: 70, delay: 50},
            {speed: 15, value: 'translateX(-%dpx)', delay: 170},
          ])}
        />
        <Intro pre="Hallo!" title="Ich bin Philipp, <br/> Webentwickler aus Berlin" />
      </Container>
      {projectNodes &&
        projectNodes.map((item, index) => <ProjectTeaser align={index % 2 === 0 ? 'left' : 'right'} project={item} />)}
    </Layout>
  )
}

export default IndexPage
