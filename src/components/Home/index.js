import React, {Component} from 'react';
import './index.css'

const Home = () => {
    return(
        <div>
            <h1>My collection App</h1>
            <p>Create your own collection</p>
            <p>Search movies using the Open Movie Data Base API</p>
            <p>Add movies to your collections</p>
            <small>Books, Comics and Games collection coming soon...</small>
            <br/>
            <img alt="movies" className="responsive" src="https://bitrebels.com/wp-content/uploads/2012/10/retro-movie-sharpie-drawings-1.jpg"/>
        </div>
    )
};

export default Home;