import { useEffect, useState, useReducer } from "react";
import Options from "./Options";

import './style.css'

const getRandom0to99 = () => Math.floor(Math.random() * 100);

export const ACTIONS = {
  SET_MEME : 'set-meme',
  PREVIOUS : 'previous',
  NEXT : 'next',
  GET_RANDOM : 'get-random'
}

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

const Meme = () => {

  const [memes, setMemes] = useState([])
  const [currentMeme, dispatch] = useReducer(
    reducer, 
    { number : getRandom0to99(),
      meme : { url : "#", name : "", box_count : 0 }
    }
  );
  const [captions, setCaptions] = useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(res => {
      res.json().then(({ success, data }) => {
        if(success){
          setMemes(data.memes)
        }
      });
    // TODO: Control and receive the errors
    }).catch(err => console.log("Error", err))
  }, [])

  useEffect(() => {
    if(memes.length){
      dispatch({ type : ACTIONS.SET_MEME, payload : { memes } })
    }
  }, [memes])

  // change the boxes of text only when it changes its count
  useEffect(() => {
    if(memes.length){
      setCaptions(
        Array(currentMeme.meme.box_count)
          .fill('')
        .map((el, i) => {
          const element = document.querySelector(`#TextBox${i}`);
          return element ? element.value.trim() : el;
        })
      );
    }
  }, [currentMeme.meme.box_count])

  useEffect(() => {
    console.log(captions);
  }, [captions]);

  return(
    <div className="meme">
      {memes.length ? 
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
        />
      </>
      : <h2>Wait please...</h2>}
    </div>
  );
}



export default Meme;
