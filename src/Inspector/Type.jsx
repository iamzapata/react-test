import styles from './Inspector.module.scss'
import { domNodeTypes } from './constants'

export function Type({ type, element }) {
  let typeText = null
  return (
    <div className={styles.Type}>
      {(() => {
        switch (typeof type) {
          case 'function':
            typeText = type.name
            break
          case 'symbol':
            typeText = type.description
            break
          default:
            if (domNodeTypes.includes(type)) {
              typeText = type
            }
            typeText = element
        }
      })()}
      type: {typeText} ({typeof type})
    </div>
  )
}
