import React from 'react'

import styles from './project-images.module.scss'
import Figure from './figure'
import {cn} from '../lib/helpers'

const ProjectImages = ({images}) => (
  <div className={cn('row', styles.projectImages)}>
    {images.map(image => (
      <div className={`col-sm-6 ${images.length === 1 && 'offset-sm-3'}`} key={image._key}>
        <Figure
          node={image}
          figureClassName={styles.projectImages__figure}
          className={styles.projectImages__image}
          options={{maxHeight: 400}}
        />
      </div>
    ))}
  </div>
)

export default ProjectImages
