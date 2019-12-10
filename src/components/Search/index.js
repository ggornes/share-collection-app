import React, {Component} from 'react';
import firebase from "../Firebase/firebase"
import {Link} from "react-router-dom";
import Axios from "axios";
import GoodReads from 'react-goodreads';
import { Form, Icon, Input, Button } from 'antd';

export class Search extends Component {

    constructor(props) {

        super(props);

        this.ref=firebase.firestore().collection('movies');

        this.state = {
            isFetching: false,
            foundResults: false,
            search_term: {
                API_url: 'https://www.omdbapi.com/?apikey=156276c&t=', // if s instead of t search returns array
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


    handleAdd = () => {

        this.ref.add(this.state.result)
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

                    console.log("Result: ", result);
                } else {
                    this.setState({
                        foundResults: false
                    })
                }

                console.log(result.Response);

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
                <div id="search-form">
                    <h3>Search movie</h3>
                    {/*<h4>{this.state.search_term.API_url+this.state.search_term.title}</h4>*/}
                    <h5>{this.state.result.title}</h5>


                        <Form onSubmit={this.onSubmit} >
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Movie Title"
                                    name="title"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" name="search" icon="search" type="primary">Search</Button>
                            </Form.Item>

                        </Form>

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
                                                    <Form>
                                                        <Form.Item>
                                                            <Button icon="plus-circle" type="primary" onClick={this.handleAdd}>Add</Button>
                                                        </Form.Item>
                                                    </Form>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )
                            :
                            (<div>
                                {
                                    this.state.isFetching ?
                                        (<p>No results</p>)
                                    :('')

                                }
                            </div>)
                    }
                    <h5>{this.state.result.title}</h5>
                </div>
            </div>
        )
    }

}

export default Search;