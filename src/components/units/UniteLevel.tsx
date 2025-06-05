type TraysIconProps = {
    idx: number
}

export const UniteLevel = ({idx}: TraysIconProps) => {
  return (
    <section className="trays-container flex-col">
        <div data-testid="tray" className={`tray ${idx === 0 ? 'bold' : '' }`}></div>
        <div data-testid="tray" className={`tray ${idx === 1 ? 'bold' : '' }`}></div>
        <div data-testid="tray" className={`tray ${idx === 2 ? 'bold' : '' }`}></div>
    </section>
  )
}