
type UserMsgProps = {
    txt: string
}

export const UserMsg = ({txt}: UserMsgProps) => {
  return (
    <div className={`user-msg ${txt ? 'active' : '' } flex-jc-ac`}>
        {txt}
    </div>
  )
}

 