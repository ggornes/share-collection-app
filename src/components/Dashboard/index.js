import React, {Component} from 'react';
import firebase from "../Firebase/firebase"
import {Link} from 'react-router-dom';
import {Layout, Popover} from 'antd';
import { Card } from 'antd';
import './index.css';
import { Tag } from 'antd';

const { Meta } = Card;

const { Header, Footer, Sider, Content } = Layout;


const { CheckableTag } = Tag;

class MyTag extends React.Component {
    state = { checked: true };

    handleChange = checked => {
        this.setState({ checked });
    };

    render() {
        return (
            <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
        );
    }
}

class Dashboard extends Component {

    constructor(props){
        super(props); // get properties from Component
        this.ref = firebase.firestore().collection('movies');
        this.unsuscribe = null;
        this.state = {
            movies:[],
            categories: [],
            isLoading: true
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const movies = [];
        const categoriesList = [];
        const categories = [];

        querySnapshot.forEach((doc) => {
            const {Title, Director, Year, Rated, Poster, Ratings, Genre} = doc.data();
            movies.push({
                key: doc.id,
                doc, // document snapshot
                Title,
                Director,
                Year,
                Rated,
                Poster,
                Ratings,
                Genre
            });
        });

        movies.map(movie => (
            // movie.Genre.map(cat => (
            categoriesList.push(movie.Genre)
            // ))
        ));

        categoriesList.map(cat => (
            // categories.push(cat)
            cat.split(",").map(c => (
                categories.push(c.trim())
            ))

        ));

        const uniqueSet = new Set(categories);
        const uniqueCategories = [...uniqueSet];
        uniqueCategories.sort();

        categories.reduce((unique, item) => {
            // console.log(
            //     item,
            //     unique,
            //     unique.includes(item),
            //     unique.includes(item) ? unique : [...unique, item]
            // );

            return unique.includes(item) ? unique : [...unique, item]
        }, []);



        this.setState({movies, categories, uniqueCategories, isLoading: false});
    };

    componentDidMount() {
        this.unsuscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        console.log(this.state.movies);
        //console.log(this.state.categoriesList);
        console.log(this.state.categories);

    }


    render() {
        return(

            <div>
                <h1>Dashboard</h1>

                {this.state.isLoading ?
                    (
                        <div>
                            Loading

                        </div>
                    )
                    :


                    <div className="card card-default">


                        <div>
                            <h3>Categories</h3>
                            {this.state.uniqueCategories.map(category =>
                                <MyTag>{category}</MyTag>
                            )}
                        </div>

                        <h3 className="card-title">Movies list</h3>

                        <div className="newContainer">
                            {this.state.movies.map(movie =>
                                <div className="responsive" key={movie.key}>


                                    <div className="newerContainer">
                                        <Link to={`/details/${movie.key}`}>
                                            <Card
                                                hoverable
                                                style={{width: 240}}
                                                cover={<img alt="example" src={movie.Poster}/>}
                                            >
                                                <Meta title={movie.Title} description=""/>
                                                <p>{movie.Director}</p>
                                                <p>{movie.Ratings[0].Value}</p>
                                            </Card>
                                        </Link>

                                    </div>
                                </div>
                            )}
                        </div>


                    </div>
                }

            </div>





        )
    }


}

export default Dashboard;