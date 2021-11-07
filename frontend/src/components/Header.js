import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/header_logo.svg';
function Header(props) {
  //console.log(props)
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__text">
        <p className="header__email">{props.userEmail}</p>
        <Link to={props.link} onClick={props.signOut} className="header__log-in-button">{props.buttonText}</Link>

      </div>

    </header>);
}

export default Header;