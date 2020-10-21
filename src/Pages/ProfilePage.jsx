import React, { useRef, useState } from 'react'
import { ProfilePagePosts } from '../Components';
import axios from 'axios';

import '../Styles/Profile.scss'

function ProfilePage({ currentUser, posts, comments, translate }) {
    const [openAddPost, setOpenAddPost] = useState(false)
    const currentPosts = posts.filter(post => post.userId === currentUser.id)

    const addPostBlock = useRef(null)
    const addedTitle = useRef(null)
    const addedText = useRef(null)
    const addedDate = useRef(null)

    const addPostHandler = () => {
        axios
            .post(`http://localhost:3001/posts/`,
                {
                    userId: currentUser.id,
                    id: posts[posts.length - 1].id + 1,
                    title: addedTitle.current.value,
                    text: addedText.current.value,
                    date: addedDate.current.value,
                },
                { headers: { authorization: localStorage.getItem('token') } })
            .then(response => {
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return currentUser ?
        (<section className='profile'>
            <div className='main__title'>{translate("profile.title")}</div>

            <div className="profile__block">
                <div className="profile__block--user">
                    <img className="profile__block--user__img" src={currentUser.imageUrl} alt={currentUser.name} />
                    <div className="profile__block--user__name">
                        {currentUser.name}
                    </div>
                </div>
                <div onClick={() => setOpenAddPost(!openAddPost)} className="profile__block--user__addpost main__button">
                    {openAddPost ? translate("profile.addPostClose") : <><span>+</span> {translate("profile.addPost")}</>}
                </div>

                {openAddPost &&
                    <div ref={addPostBlock} className="profile__block--user__addpost--block">
                        <div className="profile__block--user__addpost--block__item">
                            <b>{translate("profile.post.title")}</b> <br />  <input ref={addedTitle} type="text" />
                        </div>
                        <div className="profile__block--user__addpost--block__item">
                            <b>{translate("profile.post.text")}</b> <br />  <textarea ref={addedText} type="text" />
                        </div>
                        <div className="profile__block--user__addpost--block__item">
                            <b>{translate("profile.post.date")}</b> <br />  <input ref={addedDate} type="text" />
                        </div>
                        <div onClick={addPostHandler} className="main__button">{translate("profile.addPost")}</div>
                    </div>}

                <div className="profile__block--posts">
                    {currentPosts.map((post, i) =>
                        <ProfilePagePosts key={i} {...post} comments={comments} currentUserId={currentUser.id} translate={translate} />
                    )}
                </div>
            </div>
        </section>)
        :
        (<div className='main__title'>Login to see the content</div>)

}

export default ProfilePage
