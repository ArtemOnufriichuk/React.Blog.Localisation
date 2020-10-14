import React, { useRef, useState } from 'react'
import axios from 'axios';

function ProfilePagePosts({ id, title, text, date, comments, currentUserId, translate }) {
    const [redactor, setRedactor] = useState(false);

    const commentsBlock = useRef(null)
    const editedTitle = useRef(null)
    const editedText = useRef(null)
    const editedDate = useRef(null)

    const currentComments = comments.filter(comment => comment.postId === id)

    const toggleComments = () => {
        commentsBlock.current.classList.toggle('open')
    }

    const editHandler = (id) => {
        axios
            .put(`http://localhost:3001/posts/${id}`,
                {
                    userId: currentUserId,
                    id: id,
                    title: editedTitle.current.value,
                    text: editedText.current.value,
                    date: editedDate.current.value,
                },
                { headers: { authorization: localStorage.getItem('token') } }
            )
            .then(response => {
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const deleteHandler = (id) => {
        axios
            .delete(`http://localhost:3001/posts/${id}`, {
                headers: { authorization: localStorage.getItem('token') }
            })
            .then(response => {
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div className='home__block--item profile'>
            <div className="home__block--item__edit">
                <img onClick={() => setRedactor(!redactor)} src="https://img.icons8.com/wired/64/000000/edit.png" alt='edit' />
                <img onClick={() => deleteHandler(id)} src="https://img.icons8.com/wired/64/000000/delete-forever.png" alt='delete' />
            </div>

            <div className="home__block--item__post">
                <div className="home__block--item__post--title profile">
                    <b>{translate("profile.post.title")}</b><br />
                    {!redactor ? title : <input ref={editedTitle} type="text" defaultValue={title} />}
                </div>
                <div className="home__block--item__post--text profile">
                    <b>{translate("profile.post.text")}</b><br />
                    {!redactor ? text : <textarea ref={editedText} defaultValue={text} />}
                </div>
                <div className="home__block--item__post--date profile">
                    <b>{translate("profile.post.date")}</b><br />
                    {!redactor ? date : <input ref={editedDate} type="text" defaultValue={date} />}
                </div>

                {redactor && <button onClick={() => editHandler(id)} className='main__button profile'>{translate("profile.editPost")}</button>}

                {!redactor && currentComments.length > 0 &&
                    <button className='main__button profile' onClick={toggleComments}>
                        {translate("profile.post.comments")}
                    </button>}

                <div ref={commentsBlock} className="home__block--item__post--comments profile">
                    {currentComments.length > 0 &&
                        currentComments.map((currentComment, i) => (
                            <div key={i} className="home__block--item__post--comments__box">
                                <div className="home__block--item__post--comments__name">
                                    {translate("profile.post.commentFrom")} {currentComment.name}
                                </div>
                                <div className="home__block--item__post--comments__text">
                                    {translate("profile.post.commentText")} {currentComment.text}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePagePosts
