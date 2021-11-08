import React from 'react'

function Bed(props) {

    function handleDeleteClick (card){
        //console.log('delete')
        props.onCardDelete(card)
    }

    return (
        <div className="bed">
            <button className="element__delete-button" onClick={() => handleDeleteClick(props.cardsToAdd)}></button>
            <div className="element__info">
                <h2 className="bed__title">{props.cardsToAdd.name}</h2>
                <p className="bed__param"><span className="bed__span">Почва: </span> {props.cardsToAdd.soil}</p>
                <p className="bed__param"><span className="bed__span">Освещенность: </span> {props.cardsToAdd.light}</p>
            </div>

        </div>
    );

}

export default Bed;