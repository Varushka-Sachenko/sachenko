import React from 'react'
import Purchase from './Purchase';
function Planer(props) {
  //console.log(props)
  return (
    <section className="planer">
      <h1 className="planer__header">Планер</h1>


      <div className="planer__cont">
      <iframe className="planer__calend" title="calendar" src="https://calendar.yandex.ru/embed/month?&layer_ids=1552013&tz_id=Europe/Moscow&layer_names=Мои события" frameborder="0"></iframe>
      <div className="planer__list">
        <div className="planer__wrap">
          <h2 className="planer__list-header">Список покупок</h2>
          <button className="profile__add-button-box" onClick={props.onAddItem}></button>
        </div>
        <div className="planer__list-elems">
          {props.elements.map((element) => {

            return (<Purchase key={element._id} onCardDelete={props.onCardDelete} cardsToAdd={element} />)
          })}
        </div>
      </div>
      </div>
      
    </section>
  )
}

export default Planer;