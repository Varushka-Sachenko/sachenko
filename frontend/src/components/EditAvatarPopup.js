import React from 'react'

import PopupWithForm from './PopupWithForm';



export default function EditAvatarPopup (props){

    const avatarRef = React.useRef();

    React.useEffect(() => {
      avatarRef.current.value = ''
      
    }, [props.isOpen])

    function handleSubmit(e) {
       e.preventDefault();
    
      props.onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
      
      //avatarRef.current.value = ''
    } 
    return (
        <PopupWithForm buttonText="Сохранить" onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Обновить аватар" name="edit-avatar" children={
            <>
              <input name="avatar" ref={avatarRef} className="form__field-text form__field-text_input_avatar" placeholder="Ссылка на картинку" type="URL"
                size="40" defaultValue="" required />
            </>
          } />
    )

}