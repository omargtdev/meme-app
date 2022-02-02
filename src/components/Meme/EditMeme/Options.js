import { useState } from 'react';

import TextBox from './TextBox';

import { ACTIONS } from '.';
import Message from '../Message';

const Options = ({ 
  memes, 
  currentMeme, 
  dispatch, 
  captions, 
  setCaptions, 
  setMemeGenerated 
}) => {

  const [isAllEmpty, setIsAllEmpty] = useState(false);

  const createMeme = () => {
    
    const isEmpty = captions.every(c => c.trim() === '');
    // To show message if all of captions are empty
    if(isEmpty){
      setIsAllEmpty(isEmpty)
      return;
    }

    // To remove message if it exists
    if(isAllEmpty){
      setIsAllEmpty(isEmpty);
    }

    const formData = new FormData();
    formData.append('template_id', currentMeme.id);
    formData.append('username', process.env.REACT_APP_USERNAME);
    formData.append('password', process.env.REACT_APP_PASSWORD);
    captions.forEach((c, i) => {
      formData.append(`boxes[${i}][text]`, c);
    })

    // for waiting message
    setMemeGenerated({ isGenerated : true })

    fetch(`${process.env.REACT_APP_URL_BASE}/caption_image`, {
      method : 'POST',
      body : formData
    }).then(res => {
      res.json()
        .then(res => {
          if(res.success){
            setMemeGenerated({ isGenerated : true, url : res.data.url, name : currentMeme.name })
          }else{
            console.log(res)
            throw res;
          }
        })
        .catch(err => {
          console.log('something has happened wrong!' + JSON.stringify(res))
        })
    }).catch(err => {
      console.log(err);
    })
  }

  const changeMeme = (e, type) => {
    e.preventDefault();
    dispatch({ type, payload : { memes } })
  }

  return(
    <div className="options-container">
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
          <input type="button" className="options__btn" onClick={createMeme} value="Finish" />
        </div>
      </form>      
      {isAllEmpty ? <Message classType='msg--error' msg='Fill at least 1 field' /> : null}
    </div>
  );
}

export default Options;
