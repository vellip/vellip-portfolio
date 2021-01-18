import React from 'react'

import styles from './shape.module.scss'
import {cn} from '../lib/helpers'

export const Shape = ({shape, classes}) => (
  <svg className={cn(styles.shape, shape && `shape--${shape}`, classes)}>
    <use xlinkHref={require('../images/' + shape + '.svg') + '#icon'} />
  </svg>
)

export const ShapeWrapper = ({children, container, clone}) => (
  <div className={cn(!container && styles.shapesWrapper)}>
    <div className={cn(styles.shapesWrapper__fixedLayer, container && 'container')}>
      <div className={styles.shapesWrapper__alignedLayer}>
        {children}
        <div className={styles.shapesWrapper__clone} aria-hidden>
          {clone}
        </div>
      </div>
    </div>
  </div>
)
