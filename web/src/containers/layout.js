import {graphql, StaticQuery} from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
  }
`

function LayoutContainer(props) {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <Layout {...props} siteTitle={data.site.title}>
          <SEO title={data.site.title} description={data.site.description} keywords={data.site.keywords} />
          {props.children}
        </Layout>
      )}
    />
  )
}

export default LayoutContainer
