import React, {Component} from 'react';
import firebase from "../Firebase/firebase"
import {Link} from "react-router-dom";
import Axios from "axios";
import GoodReads from 'react-goodreads';

export class Search extends Component {

    constructor(props) {

        super(props);

        this.ref=firebase.firestore().collection('movies');

        this.state = {
            isFetching: false,
            foundResults: false,
            search_term: {
                API_url: 'https://www.omdbapi.com/?apikey=156276c&t=',
                title: ''
            },
            result: "",


        };
    }

    onChange = (e) => {
        const state = this.state;
        state.search_term[e.target.name] = e.target.value.split(" ").join("+");



        this.setState(state);
    };

    change = (e) => {
        const state = this.state;
        state.search_type = e.target.value;
        this.setState(state);
    };

    handleAdd = () => {

        this.ref.add(this.state.result)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

    };



    onSubmit = (e) => {
        // ToDo: Validate fields
        // if field is empty, var = default;
        e.preventDefault();
        console.log(this.state.search_term.API_url+this.state.search_term.title);

        // fetch movies
        fetch(this.state.search_term.API_url+this.state.search_term.title)
        //fetch(this.state.search_item.movie.API_url+this.state.search_item.movie.title)
            .then(response => response.json())
            .then(result => {

                if (result.Response !== 'False') {
                    this.setState({
                        result: result,
                        isFetching: true,
                        foundResults: true
                    });
                } else {
                    this.setState({
                        foundResults: false
                    })
                }



                console.log(result.Response);

                // if (result.Response !== "False") {
                //     this.ref.add(result)
                //         .then(function(docRef) {
                //             console.log("Document written with ID: ", docRef.id);
                //         })
                //         .catch(function(error) {
                //             console.error("Error adding document: ", error);
                //         });
                // }



            })
            .catch(e => {
                console.log(e);
                console.error("Error adding document: ", e);
                this.setState({...this.state, isFetching: false, foundResults: false});
            });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // fetch movies2
        // if (this.state.search_type === "movies") {
        //     fetch(this.state.search_item.movie.API_url+this.state.search_item.movie.title)
        //         .then(response => response.json())
        //         .then(result => {
        //             this.setState({
        //                 search_result: {
        //                     movie: {
        //                         result: result
        //                     }
        //                 },
        //                 isFetching: true,
        //                 foundResults : true
        //             });
        //
        //             console.log(result);
        //
        //         })
        //         .catch(e => {
        //             console.log(e);
        //             console.error("Error adding document: ", e);
        //             this.setState({...this.state, isFetching: false, foundResults: false});
        //         });
        // }





    };



    render() {
        return(
            <div>
                <div id="search-form">
                    <h3>Search movie</h3>
                    <h4>{this.state.search_term.API_url+this.state.search_term.title}</h4>
                    <h5>{this.state.result.title}</h5>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" name="title" placeholder="movie" onChange={this.onChange}/>
                        <button type="submit" name="Search">Search</button>
                    </form>
                </div>

                <div id="results">
                    <h2>Results</h2>
                    {
                        this.state.foundResults ?
                            (
                                <div>

                                    <div id="movie-result">

                                        <div className="card card-default">

                                            <div className="card-heading">
                                                <h3 className="card-title">Movies Results</h3>
                                            </div>

                                            <div className="card-body">
                                                <h4><Link to="/details">Add Movie</Link></h4>

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

                                                    <tr>
                                                        <td><img src={this.state.result.Poster} alt="poster" height="222" width="150"/></td>
                                                        <td>
                                                            {this.state.foundResults ?
                                                                (<Link to={`/details/`} moviedata={this.state.result}>
                                                                    {this.state.result.Title}
                                                                </Link>)
                                                                :
                                                                (<>{this.state.result.Title}</>)
                                                            }
                                                        </td>
                                                        <td>{this.state.result.Director}</td>
                                                        <td>{this.state.result.Year}</td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                                <div>
                                                    <button onClick={this.handleAdd}>Add</button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>










                                </div>
                            )
                            :
                            (<div>
                                No results
                            </div>)
                    }
                    <h5>{this.state.result.title}</h5>
                </div>
            </div>
        )
    }

}

export default Search;