type GreenPlantProps = {
  size : number
}

export const GreenPlant = ({ size } : GreenPlantProps) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={`${size}`}
        height={`${size}`}
      >
        <g
          transform="translate(1.4066 1.4066) scale(2.81 2.91)"
          fill="none"
          fillRule="nonzero"
          stroke="none"
          strokeWidth="0"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          opacity="1"
        >
          <path
            d="M54.539 11.692c-7.916 2.89-13.976 7.88-15.932 17.517l-.641 5.506c9.6-10.917 24.692-12.413 35.691-10.18-11.655 1.395-20.321 4.43-28.115 10.292l-.033-.022a11.582 11.582 0 0 0-.598.497c-.307.238-.622.449-.926.696a81.173 81.173 0 0 0-2.141 1.852l-.069.064a62.78 62.78 0 0 0-1.536 1.432c.009.013.022.022.032.035-7.485 7.246-13.069 16.383-16.43 27.311-3.8-12.39-10.369-22.556-19.658-30.318L0 41.381c11.312 9.451 18.155 23.014 20.381 40.31h6.936c2.08-16.039 8.336-28.943 18.23-38.227 8.516 5.849 17.678 7.449 27.609 2.525 14.326-8.492 16-22.893 16.845-37.681C81.755 16.493 68.046 7.109 54.539 11.692z"
            fill="#7fb241"
            strokeLinecap="round"
          />
        </g>
  </svg>
  )
}