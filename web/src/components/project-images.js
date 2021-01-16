import React from 'react'

import styles from './project-images.module.scss'
import Figure from './figure'
import {cn} from '../lib/helpers'

const ProjectImages = ({images}) => (
  <div className={cn('row', styles.projectImages)}>
    {images.map(image => (
      <div className="col-sm-6">
        <Figure node={image} className={styles.projectImages__image} />
      </div>
    ))}
  </div>
)

export default ProjectImages
