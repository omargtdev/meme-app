

const TextBox = ({ id, lblText, caption, onChange }) => {
  return(
    <div className="options__group">
      <label className="options__lbl" htmlFor={id}>{lblText} </label> 
      <input 
        className="options__input"
        type="text" 
        id={id}
        value={caption}
        onChange={onChange}
      />
    </div>
  );
  
}


export default TextBox;
