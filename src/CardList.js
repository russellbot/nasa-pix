import React from 'react';
import Card from './Card';

const CardList = ({ pix }) => {
    return (
        <Card title={pix[0].title} url={pix[0].url} explanation={pix[0].explanation} date={pix[0].date} copyright={pix[0].copyright} />
    );
}

export default CardList;