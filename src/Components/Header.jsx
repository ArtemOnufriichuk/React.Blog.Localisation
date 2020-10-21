import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import jwt from 'jsonwebtoken';
import '../Styles/Header.scss'

function Header({ users, setToken, token, currentUser, changeLanguage, translate }) {
	const [modalVisible, setModalViisible] = useState(false)
	const [language, setLanguage] = useState(false)
	const login = useRef(null)
	const password = useRef(null)

	const themeHandler = () => {
		document.body.classList.toggle('dark')
	}

	const loginHandler = (e) => {
		e.preventDefault()

		let [curUser] = users.filter(user => user.name === login.current.value && user.password === password.current.value)

		if (curUser) {
			localStorage.setItem('token', jwt.sign(JSON.stringify({ id: curUser.id }), 'secretWord'))
			setToken(localStorage.getItem('token'))
			setModalViisible(!modalVisible)
		} else {
			console.log('error');
		}
	}

	const loginOutHandler = () => {
		localStorage.setItem('token', '')
		setToken(localStorage.getItem('token'))
	}

	const languageHnadler = (lang) => {
		setLanguage(!language)
		changeLanguage(lang)
	}

	return (
		<header className='header'>
			<Link to='/' className="header__logo">
				BLOG
			</Link>

			{token && currentUser ?
				<div className="header__loggined">
					<div className='theme-button' onClick={themeHandler}>
						<span role="img" aria-labelledby="moon">🌗</span>
					</div>
					{language ?
						<button className="main__button" onClick={() => languageHnadler('en')}>en</button>
						:
						<button className="main__button" onClick={() => languageHnadler('ru')}>ru</button>
					}
					<Link to='/profile'> <img className='header__loggined--img' src={currentUser.imageUrl} alt={currentUser.name} /> </Link>
					<button onClick={loginOutHandler} className="main__button">{translate("home.logout")}</button>
				</div>
				:
				<div className="header__notloggined">
					<div className='theme-button' onClick={themeHandler}>
						<span role="img" aria-labelledby="moon">🌗</span>
					</div>
					{language ?
						<button className="main__button" onClick={() => languageHnadler('en')}>en</button>
						:
						<button className="main__button" onClick={() => languageHnadler('ru')}>ru</button>
					}
					<button onClick={() => setModalViisible(!modalVisible)} className="main__button">{translate("home.login")}</button>
				</div>}

			{modalVisible &&
				<div className="modal__login">
					<form onSubmit={loginHandler}>
						<div onClick={() => setModalViisible(!modalVisible)} className="modal__login--close">X</div>
						<input type="text" ref={login} placeholder='login' />
						<input type="text" ref={password} placeholder='password' />
						<button type='submit' className="main__button">login</button>
					</form>
				</div>}

		</header >
	);
}

export default Header;
