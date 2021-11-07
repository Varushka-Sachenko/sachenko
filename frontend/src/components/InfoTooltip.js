

export default function InfoTooltip(props) {
    let statusOpened = ""

    if (props.isOpen) {
        statusOpened = "popup_opened"

    } else {
        statusOpened = ""

    }
    const closePopups = props.onClose

    const closeEventListeners = (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopups()
        }
    }

    return (

        <div className={`popup popup_${props.name} ${statusOpened} `} onClick={closeEventListeners} >
            <div className={`popup__container`}>
                <button className="popup__close-button" onClick={closePopups} type="button"></button>
                <div className={`form form_${props.name}`}>
                    <img className="form__error-image" alt="Изображение модального окна" src={props.image} />
                    <h2 className="form__text">{props.title}</h2>
                </div>

            </div>
        </div>)



}