import React from 'react';
import './Card.css'

const Card = (props) => {
    const { name, explanation, date } = props;
    return (
        <div className='card'>
            <img alt='nasapicture' src='https://robohash.org/test?200x200' />
            <div>
                <h2>{name}</h2>
                <p>{explanation}</p>
                <p>{date}</p>
            </div>
        </div>
    );
}

export default Card;