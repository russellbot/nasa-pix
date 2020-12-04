import React from 'react';
import Highlighter from 'react-highlight-words';
import './Card.css'

const Card = (props) => {
    const { title, explanation, date, url, copyright, hdurl, searchWords, saveFavorite, object } = props;
    return (
        <div className='card'>
            <a href={hdurl}>
                <img alt='nasapicture' className="card-img-top" src={url} />
            </a>            
            <div>
                <div className="card-body">
                    <Highlighter className="card-title" highlightClassName="highlight" searchWords={[searchWords]} textToHighlight={title} autoEscape={true} />
                    <p className="clickable" onClick={() => saveFavorite({object})}>Add to Favorites</p>
                    <p><Highlighter className="card-explanation" highlightClassName="highlight" searchWords={[searchWords]} textToHighlight={explanation} autoEscape={true} /></p>
                    <h5>{date} &nbsp;&nbsp; <Highlighter className="card-copyright" highlightClassName="highlight" searchWords={[searchWords]} textToHighlight={copyright} autoEscape={true} /></h5>
                </div>                
            </div>
        </div>
    );
}

export default Card;