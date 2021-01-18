import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'

import styles from './figure.module.scss'
import {cn} from '../lib/helpers'

export default ({node, options, className, figureClassName}) => {
  if (!node.asset) {
    return null
  }
  console.log(node)

  const fluidProps = getFluidGatsbyImage(node.asset._id, {maxWidth: 675, ...(options || {})}, clientConfig.sanity)

  return (
    <figure className={cn(figureClassName)}>
      <Img fluid={fluidProps} loading="lazy" backgroundColor="#000000" alt={node.alt} className={className} />
      {node.caption && <figcaption className={styles.caption}>{node.caption}</figcaption>}
    </figure>
  )
}
