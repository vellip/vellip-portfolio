import React from 'react'

import styles from './fact-list.module.scss'

const FactList = ({facts}) => (
  <dl className={styles.factList}>
    {facts.map(item => {
      const value = item.link ? (
        <a href={item.link} target="_blank">
          {item.value}
        </a>
      ) : (
        item.value
      )
      return (
        <>
          <dt className={styles.factList__term}>{item.title}</dt>
          <dd className={styles.factList__fact}>{value}</dd>
        </>
      )
    })}
  </dl>
)

export default FactList
