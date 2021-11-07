import React from 'react'
import { Link } from 'react-router-dom';

import { CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    //console.log(currentUser)


    const [statusVisible, changeStatus] = React.useState("");

    const profileAvatarHover = () => {
        changeStatus("profile__avatar-overlay_visible")

    }
    const profileAvatarHoverNot = () => {
        changeStatus("")

    }

    const changeToPlaner = () => {
      props.changePage('/planer')
    }
    const changeToGarden = () => {
      props.changePage('/garden')
    }


    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar} onMouseOver={profileAvatarHover} onMouseOut={profileAvatarHoverNot}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    <div className={`profile__avatar-overlay ${statusVisible}`}></div>
                </div>

                <div className="profile__info">
                    <h1 className="profile__name" id="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button-box" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__status" id="profile__status">{currentUser.about}</p>
                </div>
                <button className="profile__add-button-box" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="pages">
            <Link to='/planer' onClick={changeToPlaner} className="pages__button">Планер</Link>
            <Link to='/garden' onClick={changeToGarden} className="pages__button">Огород</Link>
            </section>
            <section className="blocks">
                <div className="blocks__elem">Погода</div>
                <div className="blocks__elem">Лунный календарь</div>
            </section>

        </main>
    );
}

export default Main;