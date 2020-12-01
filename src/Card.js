import React from 'react';
import './Card.css'

const Card = (props) => {
    const { title, explanation, date, url, copyright, hdurl } = props;
    return (
        <div className='card'>
            <a href={hdurl}>
                <img alt='nasapicture' className="card-img-top" src={url} />
            </a>            
            <div>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{explanation}</p>
                    <p>{date}  {copyright}</p>
                </div>                
            </div>
        </div>
    );
}

export default Card;