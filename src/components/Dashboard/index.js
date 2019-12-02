import React, {Component} from 'react';
import firebase from "../Firebase/firebase"

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
            const {title, director, year, rating} = doc.data();
            movies.push({
                key: doc.id,
                doc, // document snapshot
                title,
                director,
                year,
                rating
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
                        <h3 className="card-title">BOARD LIST</h3>
                    </div>

                    <div className="card-body">
                        <h4><Link to="/create">Add Board</Link></h4>

                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Author</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.boards.map( board =>
                                    <tr>
                                        <td>
                                            <Link to={`/show/${board.key}`}>
                                                {board.title}
                                            </Link>
                                        </td>
                                        <td>{board.description}</td>
                                        <td>{board.author}</td>
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