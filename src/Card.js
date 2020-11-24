import React from 'react';
import './Card.css'

const Card = (props) => {
    const { title, explanation, date, url, copyright } = props;
    return (
        <div className='card'>
            <img alt='nasapicture' src={url} />
            <div>
                <h2>{title}</h2>
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