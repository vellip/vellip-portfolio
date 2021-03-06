import React from 'react'

import styles from './shape.module.scss'
import {cn} from '../lib/helpers'

export const Shape = React.forwardRef(({shape, className}, ref) => (
  <svg className={cn(styles.shape, shape && `shape--${shape}`, className)} ref={ref} aria-hidden>
    <use xlinkHref={require('../images/' + shape + '.svg') + '#icon'} />
  </svg>
))

export const ShapeWrapper = ({children, container, clone}) => (
  <div className={cn(!container && styles.shapesWrapper)} aria-hidden>
    <div className={cn(styles.shapesWrapper__fixedLayer, container && styles.shapesWrapper__fixedLayerContainer)}>
      <div className={styles.shapesWrapper__alignedLayer}>
        {children}
        <div className={styles.shapesWrapper__clone} aria-hidden>
          {clone}
        </div>
      </div>
    </div>
  </div>
)
