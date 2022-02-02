
const MemeGenerated = ({ meme, setMemeGenerated }) => {
  return(
    <>
      <div className="container-image">
        <img src={meme.url} alt={meme.name} className="meme__img"/>
      </div>
      <div className="options">
        <button 
          className="options__btn"
          onClick={() => setMemeGenerated({ isGenerated : false })}
        >Back
        </button>
        <button className="options__btn">Download</button>
      </div>
    </>
  );
}

export default MemeGenerated;
