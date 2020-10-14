import React, { useRef } from 'react'

function PostItem({ id, users, title, text, date, userId, comments, translate }) {
    const commentsBlock = useRef(null)
    const [{ imageUrl, name }] = users.filter(user => user.id === userId)

    const currentComments = comments.filter(comment => comment.postId === id)

    const toggleComments = () => {
        commentsBlock.current.classList.toggle('open')
    }

    return (
        <div className='home__block--item'>

            <div className="home__block--item__user">
                <img className="home__block--item__user--img" src={imageUrl} alt={name} />
                <div className="home__block--item__user--name">{name}</div>
                <div className="home__block--item__user--date">{date}</div>
            </div>

            <div className="home__block--item__post">
                <div className="home__block--item__post--title">
                    <b>{translate("home.post.title")}</b> {title}
                </div>
                <div className="home__block--item__post--text">
                    <b>{translate("home.post.text")}</b> {text}
                </div>

                {currentComments.length > 0 &&
                    <button className='main__button' onClick={toggleComments}>
                        {translate("home.post.comments")}
                    </button>}

                <div ref={commentsBlock} className="home__block--item__post--comments">
                    {currentComments &&
                        currentComments.map((currentComment, i) => (
                            <div key={i} className="home__block--item__post--comments__box">
                                <div className="home__block--item__post--comments__name">
                                    {translate("home.post.commentFrom")} {currentComment.name}
                                </div>
                                <div className="home__block--item__post--comments__text">
                                    {translate("home.post.commentText")} {currentComment.text}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default PostItem
