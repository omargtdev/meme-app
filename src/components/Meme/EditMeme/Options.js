import TextBox from './TextBox';

import { ACTIONS } from '.';

const Options = ({ 
  memes, 
  currentMeme, 
  dispatch, 
  captions, 
  setCaptions, 
  setMemeGenerated 
}) => {
  const createMeme = () => {

    const formData = new FormData();
    formData.append('template_id', currentMeme.id);
    formData.append('username', process.env.REACT_APP_USERNAME);
    formData.append('password', process.env.REACT_APP_PASSWORD);
    captions.forEach((c, i) => {
      formData.append(`boxes[${i}][text]`, c);
    })

    fetch(`${process.env.REACT_APP_URL_BASE}/caption_image`, {
      method : 'POST',
      body : formData
    }).then(res => {
      setMemeGenerated({ isGenerated : true })
      res.json()
        .then(res => {
          if(res.success){
            setMemeGenerated({ isGenerated : true, url : res.data.url })
            console.log(res)
          }else{
            throw res;
          }
        })
        .catch(err => {
          console.log('something has happened wrong!' + err)
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
  );
}

export default Options;
