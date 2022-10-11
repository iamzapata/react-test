import { useState, useRef, useLayoutEffect, useEffect } from 'react'

import styles from './styles.module.scss'

import { InspectIcon } from './InspectIcon'
import { Connector } from './Connector'

const highContrastColors = [
  'orange',
  'red',
  'green',
  'blue',
  'purple',
  'cyan',
  'magenta',
]


// list of dom node types
const domNodeTypes = [
  'HTML',
  'HEAD',
  'BODY',
  'DIV',
  'SPAN',
  'P',
  'A',
  'IMG',
  'UL',
  'LI',
  'INPUT',
  'BUTTON',
  'TEXTAREA',
  'SELECT',
  'OPTION',
  'FORM',
  'TABLE',
  'THEAD',
  'TBODY',
  'TR',
  'TH',
  'TD',
  'LABEL',
  'CANVAS',
  'SVG',
  'PATH',
  'ARTICLE',
  'SECTION',
  'HEADER',
  'FOOTER',
  'NAV',
  'MAIN',
  'ASIDE',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
].map(s => s.toLowerCase())



function Type({ type, element }) {

  return <div className={styles.Type}>
    {(() => {
      switch (typeof type) {
        case 'function':
          return type.name
        case 'symbol':
          return type.description
        default:
          if (domNodeTypes.includes(type)) {
            return type
          }
          return element
      }
    })()}
  </div>


}

function ChildrenList({ children, childRef }) {

  if (!children) return null

  return <div className={styles.ChildrenList}>
    <sub>children</sub>
    {
      Array.isArray(children) ? <div ref={childRef}>
        {children.map((child, index) => <Component key={index} element={child} />)}
      </div> : <Component element={children} childRef={childRef} />
    }

  </div>

}

let componentIndex = 0
function Component({ element, childRef }) {
  const [coords, setCoords] = useState([[0, 0], [0, 0]])
  const h3Ref = useRef(null)
  const refToChild = useRef(null)

  const { type = '', props = {} } = element
  const { children } = props

  useLayoutEffect(() => {
    if (h3Ref?.current) {

      const { x: xStart, y: yStart, height: rectHeight } = h3Ref.current.getBoundingClientRect()

      const { x: xEnd = 0, y: yEnd = 0 } = refToChild?.current?.getBoundingClientRect() ?? {}

      const width = xEnd - xStart
      const height = yEnd - yStart

      setCoords([[width, height], [0, rectHeight / 2]])

      h3Ref.current.parentElement.style.borderColor = highContrastColors[componentIndex++ % highContrastColors.length]

    }

  }, [h3Ref?.current, refToChild?.current])


  useEffect(() => {
    if (childRef && h3Ref.current) {
      childRef.current = h3Ref.current
    }
  }, [h3Ref.current])

  return <div className={styles.Component}>
    <h3 ref={h3Ref}>
      <Type type={type} element={element} />
    </h3>
    <ChildrenList children={children} childRef={refToChild} />
    {refToChild?.current && <Connector coords={coords} />}
  </div>
}


function Components({ root }) {

  return <Component element={root} />
}

export function Inspector({ element }) {
  const [isExpanded, setIsExpanded] = useState(false)


  return <section className={styles.Inspector}>
    {isExpanded && <div className={styles.Element}><Components root={element} /></div>}

    <InspectIcon color={isExpanded ? '#61dafb' : '#000000'} onClick={() => setIsExpanded(prev => !prev)} />

  </section >
}