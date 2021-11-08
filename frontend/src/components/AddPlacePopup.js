import React from 'react'

import PopupWithForm from './PopupWithForm';


export default function AddPlacePopup (props){

  const [cardName, setCardName] = React.useState('');
  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  }
  React.useEffect(() => {  
    setCardName('');
  }, [props.isOpen])

  const handleSubmit = (event) => {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSubmit({name:cardName})
    
}


    return(
        <PopupWithForm buttonText="Добавить в список" onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Добавить покупку" name="field_add" children={
            <>
              <input name="title" onChange={handleCardNameChange} className="form__field-text form__field-text_input_title" placeholder="Название" type="text"
                size="40" id="nameplace" value={cardName} required minLength="2" maxLength="30" />
              <span id="nameplace-error"   className="nameplace-error form__input-error"></span>
            </>
          } />
    )

}