import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'

import styles from './figure.module.scss'


export default ({node, options, className}) => {
  if (!node.asset) {
    return null
  }

  const fluidProps = getFluidGatsbyImage(node.asset._id, {maxWidth: 675, ...(options || {})}, clientConfig.sanity)

  return (
    <figure className={styles.root}>
      <Img fluid={fluidProps} alt={node.alt} className={className} />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </figure>
  )
}
