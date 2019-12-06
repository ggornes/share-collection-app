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
            select_option: 'movies',
            search_type: "movies",
            search_term: {
                API_url: 'https://www.omdbapi.com/?apikey=156276c&t=',
                title: ''
            },
            search_item: {
                movie: {
                    API_url: 'https://www.omdbapi.com/?apikey=156276c&t=',
                    title: ''
                },
                book: {
                    API_url: 'https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=pynfrGvRyf7GmO0RozFXA&q=',
                    title: ''
                }
            },
            result: "",

            search_result: {
                movie: {
                    result: ""
                },
                book: {
                    result: ""
                }
            }

        };
    }

    onChange = (e) => {
        const state = this.state;
        state.search_term[e.target.name] = e.target.value.split(" ").join("+");
        state.search_item.movie[e.target.name] = e.target.value.split(" ").join("+");
        state.search_item.book[e.target.name] = e.target.value.split(" ").join("+");


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

    handleSelect = (e) => {
        const state = this.state;
        state.select_option = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        // ToDo: Validate fields
        // if field is empty, var = default;
        e.preventDefault();
        console.log(this.state.search_term.API_url+this.state.search_term.title);

        // fetch movies
        // fetch(this.state.search_term.API_url+this.state.search_term.title)
        // //fetch(this.state.search_item.movie.API_url+this.state.search_item.movie.title)
        //     .then(response => response.json())
        //     .then(result => {
        //         this.setState({
        //             result: result,
        //             isFetching: true,
        //             foundResults : true
        //         });
        //
        //         console.log(result);
        //
        //         // if (result.Response !== "False") {
        //         //     this.ref.add(result)
        //         //         .then(function(docRef) {
        //         //             console.log("Document written with ID: ", docRef.id);
        //         //         })
        //         //         .catch(function(error) {
        //         //             console.error("Error adding document: ", error);
        //         //         });
        //         // }
        //
        //
        //
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         console.error("Error adding document: ", e);
        //         this.setState({...this.state, isFetching: false, foundResults: false});
        //     });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // fetch movies2
        if (this.state.search_type === "movies") {
            fetch(this.state.search_item.movie.API_url+this.state.search_item.movie.title)
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        search_result: {
                            movie: {
                                result: result
                            }
                        },
                        isFetching: true,
                        foundResults : true
                    });

                    console.log(result);

                })
                .catch(e => {
                    console.log(e);
                    console.error("Error adding document: ", e);
                    this.setState({...this.state, isFetching: false, foundResults: false});
                });
        }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // fetch books
        if (this.state.search_type === "books") {
            Axios.get(this.state.search_item.book.API_url+this.state.search_item.book.title)
                .then(res => {
                    this.parseXMLResponse(res.data);
                    // const result = {
                    //     Poster: searchResults[0].best_book.image_url,
                    //     Title: searchResults[0].best_book.title,
                    //     Director: searchResults[0].best_book.author.name,
                    //     Year: searchResults[0].original_publication_year
                    //
                    // };

                    // this.setState({
                    //     search_result: {
                    //         book: {
                    //             result: result
                    //         }
                    //     },
                    //     isFetching: true,
                    //     foundResults : true
                    // });

                })
                .then(res2 => {
                    console.log(res2);
                })
                .catch(error => {
                    this.setState({
                        error: error.toString(),
                        fetchingData: false
                    });
                });
        }

    };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // parse string xml received from goodreads api
    parseXMLResponse = response => {
        const parser = new DOMParser();
        const XMLResponse = parser.parseFromString(response, "application/xml");
        const parseError = XMLResponse.getElementsByTagName("parsererror");

        if (parseError.length) {
            this.setState({
                error: "There was an error fetching results.",
                fetchingData: false
            });
        } else {
            const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
            const searchResults = XMLresults.map(result => this.XMLToJson(result));
            // this.setState({ fetchingData: false }, () => {
            //     this.props.setResults(searchResults);
            // });
            console.log("searchResults: ", searchResults);
            console.log(searchResults[0].best_book);
            console.log(searchResults[0].best_book.title);
            console.log(searchResults[0].best_book.author.name);
            console.log(searchResults[0].original_publication_year);
            console.log(searchResults[0].best_book.image_url);


        }
    };


    // Function to convert simple XML document into JSON.
    // Loops through each child and saves it as key, value pair
    // if there are sub-children, call the same function recursively on its children.
    XMLToJson = XML => {
        const allNodes = new Array(...XML.children);
        const jsonResult = {};
        allNodes.forEach(node => {
            if (node.children.length) {
                jsonResult[node.nodeName] = this.XMLToJson(node);
            } else {
                jsonResult[node.nodeName] = node.innerHTML;
            }
        });
        return jsonResult;
    };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        return(
            <div>
                <div id="search-form">
                    <h3>Search movie</h3>
                    <h4>{this.state.search_type}</h4>
                    <h4>{this.state.search_term.API_url+this.state.search_term.title}</h4>
                    <h4>{this.state.search_item.movie.API_url+this.state.search_item.movie.title}</h4>
                    <h4>{this.state.search_item.book.API_url+this.state.search_item.book.title}</h4>
                    <h5>{this.state.result.title}</h5>
                    <form onSubmit={this.onSubmit}>
                        <select name="search_type" onChange={this.change}>
                            <option value="movies">Movies</option>
                            <option value="books">Books</option>
                        </select>
                        <input type="text" name="title" placeholder="movie" onChange={this.onChange}/>
                        <button type="submit" name="Search">Search</button>
                    </form>
                </div>

                <div id="results">
                    Response
                    {
                        this.state.foundResults ?
                            (
                                <div>
                                    Results

                                    {
                                        this.state.search_type === "movies" ?
                                            (
                                                <div id="book-result">

                                                    <div className="card card-default">

                                                        <div className="card-heading">
                                                            <h3 className="card-title">Movies list</h3>
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
                                            ) :
                                            (
                                                <div id="book-results">


                                                    <div className="card card-default">

                                                        <div className="card-heading">
                                                            <h3 className="card-title">Books list</h3>
                                                        </div>

                                                        <div className="card-body">
                                                            <h4><Link to="/details">Add Book</Link></h4>

                                                            <table className="table table-striped">
                                                                <thead>
                                                                <tr>
                                                                    <th>Poster</th>
                                                                    <th>Title</th>
                                                                    <th>Author</th>
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
                                            )
                                    }









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