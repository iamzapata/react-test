import { useState } from 'react'
import { CodeIcon } from './CodeIcon'
import classNames from 'classnames'
import styles from './Inspector.module.scss'

function getTypeDescriptor(type) {
  if (typeof type === 'function') {
    return type.name + ' (function)'
  }

  if (typeof type === 'symbol') {
    return type.description + ' (symbol)'
  }

  return type
}

export function ElementJSON({ element }) {
  element = {
    ...element,
    toJSON: () => {
      return {
        type: getTypeDescriptor(element.type),
        props: element.props,
      }
    },
  }
  const [isExpanded, setIsExpanded] = useState(false)
  const prettyJson = JSON.stringify(element, ['type', 'props', 'children'], 1)

  return (
    <div
      className={classNames(
        styles.ElementJSON,
        isExpanded && styles.ElementJSONExpanded
      )}
    >
      <pre>
        <CodeIcon onClick={() => setIsExpanded((prev) => !prev)} />

        {isExpanded && <code>{prettyJson}</code>}
      </pre>
    </div>
  )
}
