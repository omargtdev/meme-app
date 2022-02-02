
const Message = ({ msg = 'Wait plase...', classType }) => {
  return <div className={`msg ${classType}`}>{msg}</div>
}

export default Message;
