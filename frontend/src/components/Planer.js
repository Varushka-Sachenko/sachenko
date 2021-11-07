import React from 'react'
import Purchase from './Purchase';
function Planer(props) {
  //console.log(props)
  return (
    <section className="planer">
      <h1 className="planer__header">Планер</h1>


      <div className="planer__calend"></div>
      <div className="planer__list">
        <div className="planer__wrap">
          <h2 className="planer__list-header">Список покупок</h2>
          <button className="profile__add-button-box"></button>
        </div>
        <div className="planer__list-elems">
          {props.elements.map((element) => {

            return (<Purchase key={element._id} onCardDelete={props.onCardDelete} cardsToAdd={element} />)
          })}
        </div>
      </div>
    </section>
  )
}

export default Planer;