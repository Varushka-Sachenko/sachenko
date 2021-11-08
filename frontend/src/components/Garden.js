import React from 'react'
import Bed from './Bed'
import Note from './Note'
function Garden(props) {
  //console.log(props)
  return (
    <section className="beds">
      <h1 className="planer__header">Мой огород</h1>
      <div className="beds__wrapper">
        <div className="beds__list">
          <div className="planer__wrap">
            <h2 className="beds__list-header">Грядки</h2>
            <button className="profile__add-button-box" onClick={props.onAddBed}></button>
          </div>
          <div className="planer__list-elems">
            {props.beds.map((element) => {

              return (<Bed key={element._id} onCardDelete={props.onBedDelete} cardsToAdd={element} />)
            })}
          </div>
        </div>

        <div className="notes">
        <div className="notes__list">
          <div className="planer__wrap">
            <h2 className="beds__list-header">Мой блокнот</h2>
            <button className="profile__add-button-box" onClick={props.onAddNote}></button>
          </div>
          <div className="planer__list-elems">
            {props.notes.map((element) => {

              return (<Note key={element._id} onCardDelete={props.onNoteDelete} cardsToAdd={element} />)
            })}
          </div>
        </div>
        </div>
      </div>

    </section>
  )
}

export default Garden;