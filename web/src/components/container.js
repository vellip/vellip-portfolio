import React from 'react'

import './container.module.scss'
import {cn} from '../lib/helpers'

const Container = ({children, className, TagName = 'div'}) => {
  return <TagName className={cn('container', className)}>{children}</TagName>
}

export default Container
