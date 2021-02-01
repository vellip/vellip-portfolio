import React from 'react'
import Figure from './figure'

const serializers = {
  types: {
    figure: props => <Figure {...props} inline />,
  },
  marks: {
    muted: props => <span className="muted">{props.children}</span>,
  },
}

export default serializers
