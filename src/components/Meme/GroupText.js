

const GroupText = ({ classForm, setText, id, lblText }) => {
  return(
    <div className={`${classForm}__group`}>
      <label className={`${classForm}__lbl`} htmlFor={id}>{lblText} </label> 
      <input 
        className={`${classForm}__input`} 
        type="text" 
        id={id}
        onChange={e => setText(e.target.value)}
      />
    </div>
  );
  
}


export default GroupText;
