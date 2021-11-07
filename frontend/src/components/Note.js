import React from 'react'

function Note(props) {

    function handleDeleteClick (card){
        //console.log('delete')
        props.onCardDelete(card)
    }

    return (
        <div className="bed">
            <div className="element__info">
                <h2 className="element__title">{props.cardsToAdd.name}</h2>
                <p className="note__text"></p>
                <button className="element__delete-button" onClick={() => handleDeleteClick(props.cardsToAdd)}></button>
            </div>

        </div>
    );

}

export default Note;