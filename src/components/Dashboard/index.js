import React, {Component} from 'react';
import firebase from "../Firebase/firebase"
import {Link} from 'react-router-dom';
import {Layout, Popover} from 'antd';
import { Card } from 'antd';

const { Meta } = Card;

// import './index.css';

const { Header, Footer, Sider, Content } = Layout;


class Dashboard extends Component {

    constructor(props){
        super(props); // get properties from Component
        this.ref = firebase.firestore().collection('movies');
        this.unsuscribe = null;
        this.state = {
            movies:[]
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const movies = [];
        querySnapshot.forEach((doc) => {
            const {Title, Director, Year, Rated, Poster, Ratings} = doc.data();
            movies.push({
                key: doc.id,
                doc, // document snapshot
                Title,
                Director,
                Year,
                Rated,
                Poster,
                Ratings
            });
        });

        this.setState({movies});
    };

    componentDidMount() {
        this.unsuscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }


    render() {
        return(

            <div>
                <h1>Dashboard</h1>
                <span className="nav-text">Home</span>
                <div className="card card-default">
                    <div className="card-heading">
                        <h3 className="card-title">Movies list</h3>
                    </div>

                    <div className="newContainer">
                        {this.state.movies.map(movie =>
                            <>


                                <div className="newerContainer">
                                    <Link to={`/details/${movie.key}`}>
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={movie.Poster} />}
                                        >
                                            <Meta title={movie.Title} description="" />
                                            <p>{movie.Director}</p>
                                            <p>{movie.Ratings[0].Value}</p>
                                        </Card>
                                    </Link>

                                </div>
                            </>
                        )}
                    </div>


                </div>

            </div>





        )
    }


}

export default Dashboard;