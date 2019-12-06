import React, {Component} from 'react';
import firebase from "../Firebase/firebase"
import {Link} from 'react-router-dom';

export class Dashboard extends Component {

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
            const {Title, Director, Year, Rated, Poster} = doc.data();
            movies.push({
                key: doc.id,
                doc, // document snapshot
                Title,
                Director,
                Year,
                Rated,
                Poster
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

                <div className="card card-default">

                    <div className="card-heading">
                        <h3 className="card-title">Movies list</h3>
                    </div>

                    <div className="card-body">
                        <h4><Link to="/create">Add Movie</Link></h4>

                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Poster</th>
                                <th>Title</th>
                                <th>Director</th>
                                <th>Year</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.movies.map( movie =>
                                    <tr>
                                        <td><img src={movie.Poster} alt="poster" height="222" width="150"/></td>
                                        <td>
                                            <Link to={`/details/${movie.key}`}>
                                                {movie.Title}
                                            </Link>
                                        </td>
                                        <td>{movie.Director}</td>
                                        <td>{movie.Year}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        )
    }


}

export default Dashboard;