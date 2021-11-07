export default function ImagePopup(props) {
	
	let statusOpened = ""
	
	if (props.card.name !== "") {
		statusOpened = "popup_opened"
		
	}
	
	
	const closePopups = props.onClose

	const closePopupWithOverlay = (evt) => {
		if (evt.target === evt.currentTarget) {
			closePopups()
		}
	}
	return (

		<div className={`popup image-popup ${statusOpened}`} onClick={closePopupWithOverlay}>
			<div className="popup__container">
				<img className="image-popup__image" alt={props.card.name} src={props.card.link} />
				<button className="popup__close-button" onClick={closePopups}></button>
				<h3 className="image-popup__title">{props.card.name}</h3>
			</div>
		</div>

	)
}