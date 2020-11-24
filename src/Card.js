import React from 'react';
import './Card.css'

const Card = (props) => {
    const { title, explanation, date, url } = props;
    return (
        <div className='card'>
            <img alt='nasapicture' src={url} />
            <div>
                <h2>{title}</h2>
                <p>{explanation}</p>
                <p>{date}</p>
            </div>
        </div>
    );
}

export default Card;