type Props = {
    percent: number
}

export const  ProgressCircleSvg = ({percent}: Props) => {

const size = 52
const strokeWidth = 2;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;
const offset = circumference * (1 - percent / 100);
const progressColor = 'var(--clr4)' ;
const trackColor = '#e0e0e0';

  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}

      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.4s' }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}

      />
    </svg>
  )
}