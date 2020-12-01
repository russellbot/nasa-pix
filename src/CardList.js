import React from 'react';
import Card from './Card';

const CardList = ({ pix }) => {
    return (
        <div className='images-container'>
            {
                pix.map((picture, i) => {
                    return (
                        <Card 
                            key={pix[i].title} 
                            title={pix[i].title} 
                            url={pix[i].url} 
                            explanation={pix[i].explanation} 
                            date={pix[i].date} 
                            copyright={pix[i].copyright} 
                        />
                    )
                })
            }
        </div>
    );
}

export default CardList;