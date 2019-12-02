import React, {Component} from 'react';
import firebase from "../Firebase/firebase"

export class Search extends Component {

    constructor(props) {

        super(props);

        this.ref=firebase.firestore().collection('movies');

        this.state = {
            isFetching: false,
            foundResults: false,
            search_term: {
                API_url: 'https://www.omdbapi.com/?apikey=156276c&t=',
                movieTitle: ''
            },
            result: ""

        };
    }

    onChange = (e) => {
        const state = this.state;
        state.search_term[e.target.name] = e.target.value.split(" ").join("+");

        this.setState(state);
    };

    onSubmit = (e) => {
        // ToDo: Validate fields
        // if field is empty, var = default;
        e.preventDefault();
        console.log(this.state.search_term.API_url+this.state.search_term.movieTitle);
        fetch(this.state.search_term.API_url+this.state.search_term.movieTitle)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    result: result,
                    isFetching: true,
                    foundResults : true
                });
                console.log(result);
                this.ref.add(result)
                    .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                    .catch(function(error) {
                    console.error("Error adding document: ", error);
                });


            })
            .catch(e => {
                console.log(e);
                console.error("Error adding document: ", e);
                this.setState({...this.state, isFetching: false, foundResults: false});
            });
    };

    render() {
        return(
            <div>
                <h3>Search movie</h3>
                <h4>{this.state.search_term.API_url+this.state.search_term.movieTitle}</h4>
                <h5>{this.state.result.title}</h5>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="movieTitle" placeholder="movie" onChange={this.onChange}/>
                    <button type="submit" name="Search">Search</button>
                </form>
                <div>
                    Response
                    {
                        this.state.foundResults ?
                            (
                                <div>
                                    Results
                                    <div>
                                        {this.state.result.Title}
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