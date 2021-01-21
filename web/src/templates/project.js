import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import LayoutContainer from '../containers/layout'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import BlockContent from '../components/block-content'
import styles from './project.module.scss'
import BlockText from '../components/block-text'
import FactList from '../components/fact-list'
import Intro from '../components/intro'
import {cn} from '../lib/helpers'
import ProjectImages from '../components/project-images'
import {Shape, ShapeWrapper} from '../components/shape'
import parallax from '../lib/parallax'

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: {eq: $id}) {
      id
      categories {
        _id
        title
      }
      relatedProjects {
        title
        _id
        slug {
          current
        }
      }
      facts {
        title
        value
        link
        _key
      }
      images {
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
        caption
        _key
      }
      title
      _rawBody
      _rawExcerpt
    }
  }
`

const ProjectTemplate = props => {
  const {data, errors} = props
  const project = data && data.project

  return (
    <LayoutContainer>
      {errors && <SEO title="GraphQL Error" />}
      {project && <SEO title={project.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <Container className={styles.projectDetail__body} TagName="article">
        <ShapeWrapper clone={<Intro title={project.title} />}>
          <Shape
            shape="circle"
            className={styles.shapeCircle}
            ref={parallax.init([{speed: 13, value: 'translateY(-%dpx)'}, {speed: 8, value: 'translateX(-%dpx)'}])}
          />
          <Shape
            className={styles.shapeTriangle}
            shape="triangle"
            ref={parallax.init([{speed: 20, value: 'translateY(-%dpx)'}])}
          />
          <Shape
            shape="rectangle"
            className={styles.shapeRectangle}
            ref={parallax.init([
              {speed: 13, value: 'translateY(%dpx)', delay: 60},
              {speed: 15, value: 'translateX(-%dpx)', delay: 60},
              {speed: 3, value: 'rotate(-%ddeg)', end: 40},
            ])}
          />
        </ShapeWrapper>
        <Intro title={project.title} />
        <div className={cn('row', styles.projectDetail__intro)}>
          <div className="offset-lg-1 col-lg-4 order-md-first col-md-6">
            <BlockText blocks={project._rawExcerpt} />
          </div>
          <aside className="col-lg-3 offset-lg-1 order-first col-md-6 project-detail__facts">
            <FactList facts={project.facts} />
          </aside>
        </div>
        <ProjectImages images={project.images} />
        <div className="row">
          <div className="offset-lg-1 col-lg-7">
            <BlockContent blocks={project._rawBody} />
          </div>
        </div>
      </Container>
    </LayoutContainer>
  )
}

export default ProjectTemplate
