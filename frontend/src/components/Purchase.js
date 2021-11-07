import React from 'react'

function Purchase(props) {

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  function handleDeleteClick(card) {
    //console.log('delete')
    props.onCardDelete(card)
  }
  return (
    <div className="element">
      <h2 className="element__title">{props.cardsToAdd.name}</h2>
      <button className="element__delete-button" onClick={() => handleDeleteClick(props.cardsToAdd)}></button>
    </div>
  );

}

export default Purchase;