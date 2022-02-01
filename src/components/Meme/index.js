import { useEffect, useState } from "react";
import EditMeme from "./EditMeme";
import GenerateMeme from "./GenerateMeme";

import "./style.css";

const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [memeGenerated, setMemeGenerated] = useState({ isGenerated : false });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BASE}/get_memes`)
      .then((res) => {
        res
          .json()
          .then(({ success, data }) => {
            if (success) {
              setMemes(data.memes);
            }
          })
          .catch((err) => console.log(err));
        // TODO: Control and receive the errors
      })
      .catch((err) => console.log("Error", err));
  }, []);

  console.log(memeGenerated)
  return (
    <div className="meme">
      {memeGenerated.isGenerated ? (
        memeGenerated.url ? (
          <GenerateMeme
            meme={memeGenerated}
            setMemeGenerated={setMemeGenerated}
          />
        // TODO: Improve waiting message
        ) : <h2>Wait please ...</h2>        
      ) : memes.length ? (
        <EditMeme 
          memes={memes} 
          setMemeGenerated={setMemeGenerated} 
        />
      ) : (
        <h2>Wait please...</h2>
      )}
    </div>
  );
};

export default Meme;
