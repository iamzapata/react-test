import { useState, useRef, useLayoutEffect, useEffect } from 'react'

import styles from './Inspector.module.scss'

import { InspectIcon } from './InspectIcon'
import { Component } from './Component'

function Components({ root }) {
  return <Component element={root} />
}

export function Inspector({ element }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className={styles.Inspector}>
      {isExpanded && (
        <div className={styles.Element}>
          <Components root={element} />
        </div>
      )}

      <InspectIcon
        color={isExpanded ? '#61dafb' : '#000000'}
        onClick={() => setIsExpanded((prev) => !prev)}
      />
    </section>
  )
}
