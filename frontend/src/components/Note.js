import React from 'react'

function Note(props) {

    function handleDeleteClick(card) {
        //console.log('delete')
        props.onCardDelete(card)
    }

    return (
        <div className="note">
            <button className="element__delete-button" onClick={() => handleDeleteClick(props.cardsToAdd)}></button>
            <div className="note__info">
                <h2 className="note__title">{props.cardsToAdd.name}</h2>
                <p className="note__text">{props.cardsToAdd.text}</p>
            </div>

        </div>
    );

}

export default Note;