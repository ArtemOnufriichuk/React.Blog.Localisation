import React from 'react'
import { UserPosts } from '../Components';

function Home({ posts, users, comments, translate }) {
    return (
        <>
            <section className='home'>
                <div className='main__title'>{translate("home.title")} ({posts.length})</div>

                <div className="home__block">
                    {posts.map((post, i) => <UserPosts key={i} {...post} users={users} comments={comments} translate={translate} />)}
                </div>
            </section>
        </>
    )
}

export default Home
