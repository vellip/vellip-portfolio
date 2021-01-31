import React from 'react'

import LayoutContainer from '../containers/layout'
import SEO from '../components/seo'
import {graphql} from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import Intro from '../components/intro'

export const query = graphql`
  query TextPageTemplateQuery($id: String!) {
    page: sanityTextPage(id: {eq: $id}) {
      id
      categories {
        _id
        title
      }
      relatedPages {
        ... on SanityProject {
          title
          _id
          slug {
            current
          }
        }
        ... on SanityTextPage {
          title
          _id
          slug {
            current
          }
        }
      }
      title
      _rawBody
      _rawExcerpt
    }
  }
`

const NotFoundPage = ({data}) => {
  const page = data && data.page

  return (
    <LayoutContainer>
      <SEO title={page.title} />
      <Container TagName="article">
        <Intro title={page.title} />

        <div className="row">
          <div className="offset-sm-2 col-sm-8">
            <BlockContent blocks={page._rawBody} />
          </div>
        </div>
      </Container>
    </LayoutContainer>
  )
}

export default NotFoundPage
