import React from 'react'

import PopupWithForm from './PopupWithForm';


export default function AddNotePopup (props){

  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  React.useEffect(() => {  
    setTitle('');
    setText('');
  }, [props.isOpen])

  const handleSubmit = (event) => {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSubmit({name:title, text: text, _id:props.makeId})
    
}


    return(
        <PopupWithForm buttonText="Создать" onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Добавить заметку" name="field_add" children={
            <>
              <input name="title" onChange={handleTitleChange} className="form__field-text form__field-text_input_title" placeholder="Название" type="text"
                size="40" id="nameplace" value={title} required minLength="2" maxLength="30" />
              <span id="nameplace-error"   className="nameplace-error form__input-error"></span>
              <input name="soil" onChange={handleTextChange} className="form__field-text form__field-text_input_title" placeholder="Текст заметки" type="text"
                size="40" id="nameplace" value={text} required minLength="2" />
              <span id="nameplace-error"   className="nameplace-error form__input-error"></span>
              
            </>
          } />
    )

}