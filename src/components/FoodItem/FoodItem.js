import React from 'react';

import './FoodItem.css';

const FoodItem = ({itemsToShow}) => {
    return(
        <div className='FoodItem'>
            <h3 className='Items'> Item1: {itemsToShow[0]} </h3>
            <h3 className='Items'> Item2: {itemsToShow[1]} </h3>
            <h3 className='Items'> Item3: {itemsToShow[2]} </h3>
            <h3 className='Items'> Item4: {itemsToShow[3]} </h3>
            <h3 className='Items'> Item5: {itemsToShow[4]} </h3>
        </div>
    );
}

export default FoodItem;