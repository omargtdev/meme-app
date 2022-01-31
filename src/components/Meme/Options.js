import TextBox from './TextBox';

import { ACTIONS } from '.';

const Options = ({ memes, dispatch, currentMeme, captions, setCaptions }) => {

  const changeMeme = (e, type) => {
    e.preventDefault();
    dispatch({ type, payload : { memes } })
  }

  return(
    <form className="options">
      <div className="options__group">
        <button className="options__btn" onClick={e => changeMeme(e, ACTIONS.PREVIOUS)}>Previous</button>
        <button className="options__btn" onClick={e => changeMeme(e, ACTIONS.GET_RANDOM)}>Get Random</button>
        <button className="options__btn" onClick={e => changeMeme(e, ACTIONS.NEXT)}>Next</button>
      </div>
      {captions.map((c, index) => 
        <TextBox
          key={index}
          id={`TextBox${index}`}
          caption={c}
          lblText={`Text box ${index + 1}:`}
          onChange={({ target : { value } }) => setCaptions(
            captions.map((c, i) => i === index ? value : c)
          )}
        >
        </TextBox>
      )}
      <div className="options__group">
        <input type="button"className="options__btn" value="Finish" />
      </div>
    </form>      
  );
}

export default Options;
