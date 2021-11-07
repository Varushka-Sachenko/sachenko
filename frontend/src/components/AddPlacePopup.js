import React from 'react'

import PopupWithForm from './PopupWithForm';


export default function AddPlacePopup (props){

  const [cardName, setCardName] = React.useState('');
  const [cardImage, setCardImage] = React.useState('');
  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  }
  const handleCardImageChange = (e) => {
    setCardImage(e.target.value);
  }

  React.useEffect(() => {
    
    setCardName('');
    setCardImage('')
    
  }, [props.isOpen])

  const handleSubmit = (event) => {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSubmit({name:cardName, link:cardImage})
    
    
}


  
    return(
        <PopupWithForm buttonText="Создать" onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Новое место" name="field_add" children={
            <>
              <input name="title" onChange={handleCardNameChange} className="form__field-text form__field-text_input_title" placeholder="Название" type="text"
                size="40" id="nameplace" value={cardName} required minLength="2" maxLength="30" />
              <span id="nameplace-error"   className="nameplace-error form__input-error"></span>
              <input name="link" onChange={handleCardImageChange} className="form__field-text form__field-text_input_link" placeholder="Ссылка на картинку"
                type="URL" size="40" id="linkplace" value={cardImage} required />
              <span id="linkplace-error"  className="linkplace-error form__input-error"></span>
            </>
          } />
    )

}