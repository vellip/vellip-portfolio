import React from 'react'

import styles from './intro.module.scss'
import {cn} from '../lib/helpers'

export default function Intro({title, pre, hasMargin = true}) {
  return (
    <header className={`${styles.intro} ${pre && styles.introBig} ${!hasMargin && styles.introNoMargin}`}>
      {pre && <div className={cn(styles.intro__pre, 'h1')}>{pre}</div>}
      <h1 className={cn(styles.intro__title, pre && 'offset-1')} dangerouslySetInnerHTML={{__html: title}} />
    </header>
  )
}
