import React from 'react';
import Card from './Card';
import './CardList.css'

const CardList = ({ pix }) => {
    const cardComponent = pix.map((picture, i) => {
        return <Card key={pix[i].title} title={pix[i].title} url={pix[i].url} explanation={pix[i].explanation} date={pix[i].date} copyright={pix[i].copyright} />
    })
    return (
        <div className='images-container'>
            {cardComponent}
        </div>
    );
}

export default CardList;