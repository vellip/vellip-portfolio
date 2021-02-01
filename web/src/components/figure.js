import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage, getFixedGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'

import styles from './figure.module.scss'
import {cn} from '../lib/helpers'

export default ({node, options, className, figureClassName, inline}) => {
  if (!node.asset) {
    return null
  }

  let prop
  if (!inline) {
    prop = {fluid: getFluidGatsbyImage(node.asset._id || node.asset._ref, {...(options || {})}, clientConfig.sanity)}
  } else {
    prop = {
      fixed: getFixedGatsbyImage(
        node.asset._id || node.asset._ref,
        {width: 500, ...(options || {})},
        clientConfig.sanity
      ),
    }
  }

  return (
    <figure className={cn(figureClassName, inline && styles.inline)}>
      <Img {...prop} loading="lazy" alt={node.alt} className={className} />
      {node.caption && <figcaption className={styles.caption}>{node.caption}</figcaption>}
    </figure>
  )
}
