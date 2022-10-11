import styles from './styles.module.scss'

export function Connector({ coords }) {

  const [[width, height], [xStart, yStart]] = coords

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={styles.Connector}
    >
      <defs>
        <marker id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0,-5L10,0L0,5" fill="currentColor"
          ></path>
        </marker>
      </defs>

      <circle cx={xStart} cy={yStart} r="2" fill="currentColor" />


      <path
        d={`M ${xStart} ${yStart} Q ${xStart - 20} ${height}, ${width + 1} ${height + 2}`}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrow)"
      />


    </svg>
  )
}
