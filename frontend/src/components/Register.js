import React from 'react'
import { Link, withRouter } from 'react-router-dom';

import Header from "./Header";
function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.


    function handleUserEmail(e) {
        setEmail(e.target.value);
    }
    function handleUserPassword(e) {
        setPassword(e.target.value);
    }
    function handleSubmit (e){
        props.handleSubmit(e,email, password)
    }

    return (

        <>
            <Header buttonText="Войти" link="/sign-in" />

            <form className={`form form_login`} name="test" onSubmit={handleSubmit}>
                <h2 className="form__text form__text_login">Регистрация</h2>
                <input name="email" className="form__field-text form__field-text_input_name form__field-text_login" placeholder="Email" type="email"
                    size="40" required minLength="2" value={email} maxLength="40" onChange={handleUserEmail} />
                <span id="username-error" className="username-error form__input-error"></span>

                <input name="password" className="form__field-text form__field-text_input_job form__field-text_login" placeholder="Пароль"
                    type="password" size="40" required minLength="2" value={password} maxLength="200" onChange={handleUserPassword} />
                <span id="status-error" className="status-error form__input-error"></span>
                <button type="submit" className="form__save-button form__save-button_login">Зарегистрироваться</button>
                <p className="form__under-button-text">Уже зарегистрированы? <Link className="form__under-button-link" to="/sign-in">Войти</Link></p>
            </form>


        </>
    )
}

export default withRouter(Register)