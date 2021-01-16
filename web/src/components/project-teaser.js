import React from 'react'

import styles from './project-teaser.module.scss'
import Figure from './figure'
import {cn} from '../lib/helpers'
import {Link} from 'gatsby'
import BlockText from './block-text'

// gridStyle ? {w: 700} : {h:600}

export default function ProjectTeaser({project, align, gridStyle}) {
  const _align = align && (align.charAt(0).toUpperCase() + align.slice(1))
  return (
    <div className={cn(align && styles[`projectTeaser${_align}`], gridStyle ? styles.projectTeaserGrid : styles.projectTeaserFull)}>
      <Link to={`/projects/${project.slug.current}`} className={styles.projectTeaser__link}>
        <Figure node={project.mainImage} options={{maxWidth: '', maxHeight: 650}} className={styles.projectTeaser__image} />
        <div className={styles.projectTeaser__body}>
          <h2>{project.title}</h2>
          <div className={styles.projectTeaser__text}>
            <BlockText blocks={project._rawExcerpt} />
          </div>
        </div>
      </Link>
    </div>
  )
}
