import React, { useState, useEffect } from 'react';
import '../node_modules/normalize.css/normalize.css';
import './Styles/App.scss';
import { Route } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useTranslation } from 'react-i18next';

import { Header } from './Components';
import { Home, ProfilePage } from './Pages';

function App() {
	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);

	const { t, i18n } = useTranslation();
	
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

	const [token , setToken] = useState(localStorage.getItem('token'))
	const userInToken = token && (jwt.decode(token))
	const currentUser = userInToken && users.find(user => user.id === userInToken.id)
	
	useEffect(() => {
		axios
			.get(`http://localhost:3001/users`)
			.then(({ data }) => {
				setUsers(data);
			})
			.catch((e) => {
				console.log(e);
			});

		axios
			.get(`http://localhost:3001/posts`)
			.then(({ data }) => {
				setPosts(data);
			})
			.catch((e) => {
				console.log(e);
			});

		axios
			.get(`http://localhost:3001/comments`)
			.then(({ data }) => {
				setComments(data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<>
			<div className='wrapper'>
				<Header users={users} token={token} setToken={setToken} currentUser={currentUser} changeLanguage={changeLanguage} translate={t} />
			</div>
			<div className='wrapper'>
				<div className='content'>
					<Route exact path='/' render={() => <Home posts={posts} users={users} comments={comments} translate={t} />} />
					<Route exact path='/profile' render={() => <ProfilePage users={users} token={token} currentUser={currentUser} posts={posts} comments={comments} translate={t}/>} />
				</div>
			</div>
		</>
	);
}

export default App;
