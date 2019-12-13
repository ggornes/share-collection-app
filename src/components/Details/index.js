import React, {Component} from 'react';
import firebase from "../Firebase/firebase"
import {Link} from 'react-router-dom';
import {Button, Card, Form} from "antd";
import { Row, Col } from 'antd';
import './index.css';

const { Meta } = Card;

const star = '<svg class="imdb-star" xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">'
    +'<path d="M0 0h24v24H0z" fill="none"></path>'
    +'<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>'
    +'<path d="M0 0h24v24H0z" fill="none"></path>'
    +'</svg>';


class Details extends Component {
    constructor(props) {
        super(props);

        this.ref=firebase.firestore().collection('movies');

        this.state = {
            movie:{},
            key:'',
            isLoading: true
        }
    }

    componentDidMount() {
        // const ref=firebase.firestore().collection('movies').doc(this.props.match.params.id);


        // get the saved result object from Search.fetch() from local storage


        // const movieAPI = this.props.match.params.id;
        // console.log("Testing: this.props.match.params: ", movieAPI);
        const movieAPI = JSON.parse(localStorage.getItem('theMovie'));
        console.log("Testing: this.props.match.params: ", movieAPI);


        const movies_collection=firebase.firestore().collection('movies');
        const movie = movies_collection.doc(this.props.match.params.id);
        if (movie) {
            // QuerySnapShot.doc()
            movie.get()
                .then((doc) =>{
                    if (doc.exists) {
                        this.setState({
                            movie:doc.data(),
                            key: doc.id,
                            isLoading: false
                        });

                    } else {
                        this.setState({
                            movie: movieAPI,
                            // key: doc.id,
                            isSearchObject: true,
                            isLoading: false
                        });
                        console.log("No such document");
                    }

                })
        }


    }

    handleAdd = () => {
        console.log("movie from local storage: ", this.state.movie);

        this.ref.add(this.state.movie)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert("Movie added to Collection");
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                alert("Error while adding movie to collection");
            });

        this.setState({foundResults: false});

    };

    delete(id) {
        firebase.firestore().collection('movies')
            .doc(id).delete().then(()=>{
            console.log("Document successfully deleted!");
            this.props.history.push("/dashboard");
        }).catch((error)=>{
            console.error("Error removing document: ", error);
        });
    }

    render(){
        const movie = this.state.movie;
        console.log("Ratings: ", movie.Ratings);
        // const ratings = this.state.movie.Ratings.map(rating =>
        //     <div>
        //         <span>{rating.Source}</span>
        //         <span>{rating.Value}</span>
        //     </div>
        // );
        return(
            <div>

                {this.state.isLoading ?
                    (
                        <div>
                            Loading

                        </div>
                    )
                    :
                    <div className="itemContainer">

                        <div className="film">
                            <div className="poster">
                                <img alt="poster" src={movie.Poster} className="responsive"/>
                            </div>
                            <div className="info">

                                <p className="film-title">
                                    <strong>
                                        {movie.Title}
                                    </strong>
                                    <span className="film-year">
                                                {movie.Year}
                                            </span>
                                </p>

                                <p className="film-director">
                                    <strong>Director: </strong>{movie.Director}
                                </p>

                                <p className="film-rated-genre">
                                    {movie.Rated} | {movie.Genre}
                                </p>

                                <p className="filmPlot">
                                    <strong>Plot: </strong>{movie.Plot}
                                </p>

                                <div className="film-score">
                                    <strong>Ratings:</strong>
                                    {movie.Ratings.map(rating =>
                                        <p><span>{rating.Source} : {rating.Value}</span></p>
                                    )}

                                </div>
                            </div>

                        </div>


                        {this.state.isSearchObject ?
                            (
                                <Form>
                                    <Form.Item>
                                        <Button icon="plus-circle" type="primary"
                                                onClick={this.handleAdd}
                                                >Add</Button>
                                    </Form.Item>
                                </Form>

                            )
                            :
                            (
                                <div>
                                    <Link to={`/edit/${this.state.key}`} className="btn btn-success mr-2">
                                        <Button icon="edit" type="primary">Edit</Button>
                                    </Link>


                                    <Form>
                                        <Form.Item>
                                            <Button icon="minus-circle" type="danger"
                                                    onClick={this.delete.bind(this, this.state.key)}>Delete</Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            )
                        }




                    </div>
                }





            </div>
        );
    }


}

export default Details;