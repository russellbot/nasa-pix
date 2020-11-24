import React from 'react';
import Card from './Card';
import './CardList.css'

const CardList = ({ pix }) => {
    return (
        <div className='images-container'>
            <Card title={pix[0].title} url={pix[0].url} explanation={pix[0].explanation} date={pix[0].date} copyright={pix[0].copyright} />
            <Card title={pix[1].title} url={pix[1].url} explanation={pix[1].explanation} date={pix[1].date} copyright={pix[1].copyright} />
            <Card title={pix[2].title} url={pix[2].url} explanation={pix[2].explanation} date={pix[2].date} copyright={pix[2].copyright} />
            <Card title={pix[4].title} url={pix[4].url} explanation={pix[4].explanation} date={pix[4].date} copyright={pix[4].copyright} />
        </div>
    );
}

export default CardList;