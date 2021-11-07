

export default function PopupWithForm(props) {
	let statusOpened = ""
	
	if (props.isOpen){
		statusOpened = "popup_opened"
		
	}else {
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
				<form className={`form form_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
					<h2 className="form__text">{props.title}</h2>
					{props.children}
					<button type="submit" className="form__save-button">{props.buttonText}</button>
                </form>
            </div>
		</div>)
}

