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
        const ref=firebase.firestore().collection('movies').doc(this.props.match.params.id);
        // QuerySnapShot.doc()
        ref.get()
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
                        <dd>{this.state.movie.title}</dd>
                        <dt>Author:</dt>
                        <dd>{this.state.movie.director}</dd>
                        <dt>Title:</dt>
                        <dd>{this.state.movie.year}</dd>
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