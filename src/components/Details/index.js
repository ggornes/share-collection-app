import React, {Component} from 'react';
import firebase from "../Firebase/firebase"
import {Link} from 'react-router-dom';

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
        return(
            <div>
                <h1>details</h1>

                <div className="card-body">
                    <dl>
                        <dt>Description:</dt>
                        <dd>{this.state.movie.Title}</dd>
                        <dt>Author:</dt>
                        <dd>{this.state.movie.Director}</dd>
                        <dt>Title:</dt>
                        <dd>{this.state.movie.Year}</dd>
                    </dl>
                    <Link to={`/edit/${this.state.key}`} className="btn btn-success mr-2">
                        Edit
                    </Link>
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