import React from 'react';
import Card from './Card';

const CardList = ({ pix, searchWords, saveFavorite, removeFavorite, page }) => {
    return (
        <div className='images-container'>
            {
                pix.map((picture, i) => {
                    return (
                        <Card 
                            key={pix[i].title}
                            searchWords={searchWords}
                            saveFavorite={saveFavorite}
                            removeFavorite={removeFavorite}
                            title={pix[i].title} 
                            url={pix[i].url} 
                            explanation={pix[i].explanation} 
                            date={pix[i].date} 
                            copyright={pix[i].copyright}
                            object={pix[i]}
                            page={page}
                        />
                    )
                })
            }
        </div>
    );
}

export default CardList;