import React, {Component} from 'react';
import firebase from "../Firebase/firebase"
import {Link} from 'react-router-dom';
import {Card} from "antd";
const { Meta } = Card;

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie:{},
            key:''
        }
    }

    componentDidMount() {
        // const ref=firebase.firestore().collection('movies').doc(this.props.match.params.id);
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
                        console.log("No such document");
                    }

                })
        }


    }

    delete(id) {
        firebase.firestore().collection('movies')
            .doc(id).delete().then(()=>{
            console.log("Document successfully deleted!");
            this.props.history.push("/");
        }).catch((error)=>{
            console.error("Error removing document: ", error);
        });
    }

    render(){
        const movie = this.state.movie;
        return(
            <div>
                <h1>details</h1>

                <div className="card-body">

                    <div className="newerContainer">
                        <Card
                            hoverable
                            style={{ width: 480 }}
                            cover={<img alt="poster" src={movie.Poster} />}
                        >
                            <Meta title={movie.Title} description="" />
                            <p>{movie.Director}</p>
                        </Card>
                        <Link to={`/edit/${this.state.key}`} className="btn btn-success mr-2">
                            Edit
                        </Link>


                    </div>

                    <button
                        onClick={this.delete.bind(this, this.state.key)}
                        className="btn btn-danger">
                        Delete
                    </button>

                </div>

            </div>
        );
    }


}

export default Details;