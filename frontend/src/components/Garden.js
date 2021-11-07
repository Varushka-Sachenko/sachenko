import React from 'react'
import Bed from './Bed'
function Garden(props) {
  //console.log(props)
  return (
    <section className="beds">
      <h1 className="planer__header">Мой огород</h1>
      <div className="beds__wrapper">
        <div className="beds__list">
          <div className="planer__wrap">
            <h2 className="beds__list-header">Грядки</h2>
            <button className="profile__add-button-box"></button>
          </div>
          <div className="planer__list-elems">
            {props.elements.map((element) => {

              return (<Bed key={element._id} onCardDelete={props.onCardDelete} cardsToAdd={element} />)
            })}
          </div>
        </div>

        <div className="notes">
        <div className="notes__list">
          <div className="planer__wrap">
            <h2 className="beds__list-header">Мой блокнот</h2>
            <button className="profile__add-button-box"></button>
          </div>
          <div className="planer__list-elems">
            {props.elements.map((element) => {

              return (<Bed key={element._id} onCardDelete={props.onCardDelete} cardsToAdd={element} />)
            })}
          </div>
        </div>
        </div>
      </div>

    </section>
  )
}

export default Garden;