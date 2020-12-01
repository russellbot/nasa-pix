import React from 'react';
import './Card.css'

const Card = (props) => {
    const { title, explanation, date, url, copyright, hdurl } = props;
    return (
        <div className='card'>
            <a href={hdurl}>
                <img alt='nasapicture' src={url} />
            </a>            
            <div>
                <h2 className="card-title">{title}</h2>
                <p>{explanation}</p>
                <div className='card-bottom'>
                    <p>{date}</p>
                    <p>{copyright}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;