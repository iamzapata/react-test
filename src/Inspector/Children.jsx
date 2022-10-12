import { Fragment } from 'react'
import styles from './Inspector.module.scss'
import { Component } from './Component'

function Index({ index }) {
  return <div className={styles.Index}>{index}</div>
}

export function Children({ children, childRef }) {
  if (!children) return null

  return (
    <div className={styles.Children}>
      <sub>
        {Array.isArray(children) ? (
          <span>
            <strong>{children.length}</strong> children
          </span>
        ) : (
          'children'
        )}
      </sub>
      {Array.isArray(children) ? (
        <div ref={childRef} className={styles.ChildrenList}>
          {children.map((child, index) => (
            <Fragment key={index}>
              <Index index={index + 1} />
              <Component key={index} element={child} />
            </Fragment>
          ))}
        </div>
      ) : (
        <Component element={children} childRef={childRef} />
      )}
    </div>
  )
}
