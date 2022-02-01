import { useEffect, useState, useReducer } from "react";
import Options from "./Options";

export const ACTIONS = {
  SET_MEME : 'set-meme',
  PREVIOUS : 'previous',
  NEXT : 'next',
  GET_RANDOM : 'get-random'
}

const getRandom0to99 = () => Math.floor(Math.random() * 100);

function reducer(state, action){
  let { number } = state;
  // memes.length = 100 (index 0 to 99)
  switch(action.type){
    case ACTIONS.SET_MEME:
      break;
    case ACTIONS.PREVIOUS:
      number = number === 0 ? 99 : number - 1;
      break;
    case ACTIONS.NEXT:
      number = number === 99 ? 0 : number + 1;
      break;
    case ACTIONS.GET_RANDOM:
      number = getRandom0to99();
      break;
    default:
      return state;
  }
  return { number, meme : action.payload.memes[number]}
}

const EditMeme = ({ memes, setMemeGenerated }) => {

  const [currentMeme, dispatch] = useReducer(
    reducer, 
    { number : getRandom0to99(),
      meme : { url : "#", name : "", box_count : 0 }
    }
  );
  const [captions, setCaptions] = useState([])

  useEffect(() => {
    dispatch({ type : ACTIONS.SET_MEME, payload : { memes } })
  }, [memes])

  // change the boxes of text only when it changes its count
  useEffect(() => {
    setCaptions(
      Array(currentMeme.meme.box_count)
        .fill('')
      .map((el, i) => {
        const element = document.querySelector(`#TextBox${i}`);
        return element ? element.value.trim() : el;
      })
    );
  }, [currentMeme.meme.box_count])


  return(
    <>
      <div className="container-image">
        <img src={currentMeme.meme.url} alt={currentMeme.meme.name} className="meme__img" />
      </div>
      <Options 
        memes={memes}
        currentMeme={currentMeme.meme}
        dispatch={dispatch}
        captions={captions}
        setCaptions={setCaptions}
        setMemeGenerated={setMemeGenerated}
      />
    </>
  );
}


export default EditMeme;
