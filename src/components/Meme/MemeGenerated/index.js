
const MemeGenerated = ({ meme, setMemeGenerated }) => {

  const downloadMeme = async () => {
    const img = await fetch(meme.url);
    const imgBlob = await img.blob();
    const imgURLToDownload = URL.createObjectURL(imgBlob);

    const link = document.createElement('a');
    link.style.display = "none";
    link.href = imgURLToDownload;
    link.download = "meme.jpg"

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
        <button className="options__btn" onClick={downloadMeme}>Download</button>
        <a className="options__btn options__btn--a-version" href={meme.url} target="_blank" rel="noreferrer">See better</a>
      </div>
    </>
  );
}

export default MemeGenerated;
