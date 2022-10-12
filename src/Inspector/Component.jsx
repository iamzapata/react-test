import { useState, useRef, useLayoutEffect, useEffect } from 'react'

import { Children } from './Children'
import { Type } from './Type'
import { Connector } from './Connector'
import { ElementJSON } from './ElementJSON'
import { highContrastColors } from './constants'

import styles from './Inspector.module.scss'

let componentIndex = 0
export function Component({ element, childRef }) {
  const [coords, setCoords] = useState([
    [0, 0],
    [0, 0],
  ])
  const ref = useRef(null)
  const h5Ref = useRef(null)
  const refToChild = useRef(null)

  const { type = '', props = {} } = element
  const { children } = props

  useLayoutEffect(() => {
    if (h5Ref?.current) {
      const {
        x: xStart,
        y: yStart,
        height: rectHeight,
      } = h5Ref.current.getBoundingClientRect()

      const { x: xEnd = 0, y: yEnd = 0 } =
        refToChild?.current?.getBoundingClientRect() ?? {}

      const width = xEnd - xStart
      const height = yEnd - yStart

      setCoords([
        [width, height],
        [0, rectHeight],
      ])

      h5Ref.current.parentElement.style.borderColor =
        highContrastColors[componentIndex++ % highContrastColors.length]
    }
  }, [h5Ref?.current, refToChild?.current])

  useEffect(() => {
    if (childRef && ref.current) {
      childRef.current = ref.current
    }
  }, [ref.current])

  return (
    <div className={styles.Component} ref={ref}>
      <h5 ref={h5Ref}>
        <Type type={type} element={element} />
      </h5>
      <ElementJSON element={element} />
      <Children children={children} childRef={refToChild} />
      {refToChild?.current && <Connector coords={coords} />}
    </div>
  )
}
