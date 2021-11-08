import React from 'react'

import PopupWithForm from './PopupWithForm';


export default function AddBedPopup (props){

  const [cardName, setCardName] = React.useState('');
  const [soil, setSoil] = React.useState('');
  const [light, setLight] = React.useState('');

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  }
  const handleSoilChange = (e) => {
    setSoil(e.target.value);
  }
  const handleLightChange = (e) => {
    setLight(e.target.value);
  }
  React.useEffect(() => {  
    setCardName('');
    setSoil('');
    setLight('');
  }, [props.isOpen])

  const handleSubmit = (event) => {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSubmit({name:cardName, soil: soil, light: light, _id:props.makeId})
    
}


    return(
        <PopupWithForm buttonText="Создать" onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Добавить грядку" name="field_add" children={
            <>
              <input name="title" onChange={handleCardNameChange} className="form__field-text form__field-text_input_title" placeholder="Название" type="text"
                size="40" id="nameplace" value={cardName} required minLength="2" maxLength="30" />
              <span id="nameplace-error"   className="nameplace-error form__input-error"></span>
              <input name="soil" onChange={handleSoilChange} className="form__field-text form__field-text_input_title" placeholder="Почва" type="text"
                size="40" id="nameplace" value={soil} required minLength="2" maxLength="30" />
              <span id="nameplace-error"   className="nameplace-error form__input-error"></span>
              <input name="light" onChange={handleLightChange} className="form__field-text form__field-text_input_title" placeholder="Освещенность" type="text"
                size="40" id="nameplace" value={light} required minLength="2" maxLength="30" />
              <span id="nameplace-error"   className="nameplace-error form__input-error"></span>
            </>
          } />
    )

}