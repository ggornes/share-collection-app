import React, {Component} from 'react';
import firebase from "../Firebase/firebase"
import {Link} from 'react-router-dom';
import { Form, Input, Button, Radio } from 'antd';

const { TextArea } = Input;

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            key: '',
            formLayout: 'horizontal',
        }
    }

    handleFormLayoutChange = e => {
        this.setState({ formLayout: e.target.value });
    };

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

    onChange = (e) => {
        const state = this.state;
        state.movie[e.target.name] = e.target.value;
        console.log("on change ", state);
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();

        firebase.firestore().collection('movies').doc(this.state.key).update({Title: this.state.movie.Title, Director: this.state.movie.Director, Rated: this.state.movie.Rated, Genre: this.state.movie.Genre, Plot: this.state.movie.Plot}).then(()=>{
            console.log("Changes updated");
            this.props.history.push("/");

        }).catch((error)=>{
            console.error("Error while updating: ", error)
        });


    };


    render() {
        const movie = this.state.movie;
        const { getFieldDecorator } = this.props.form;
        //console.log(this.props.form);

        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                    wrapperCol: { span: 14, offset: 4 },
                }
                : null;

        return(
            <div>
                <h2>Edit</h2>
                <p>{movie.Title}</p>


                <div>
                    <Form layout={formLayout} onSubmit={this.onSubmit}>

                        <Form.Item label="Title" {...formItemLayout}>
                            {getFieldDecorator('Title', {initialValue: this.state.movie.Title})(<Input name="Title" onChange={this.onChange}/>)}
                            {/*<Input placeholder="input placeholder" value={this.state.movie.Title} onChange={this.onChange}/>*/}
                        </Form.Item>
                        <Form.Item label="Director" {...formItemLayout}>
                            {getFieldDecorator('Director', {initialValue: this.state.movie.Director})(<Input onChange={this.onChange}/>)}
                        </Form.Item>
                        <Form.Item label="Rated" {...formItemLayout}>
                            {getFieldDecorator('Rated', {initialValue: this.state.movie.Rated})(<Input onChange={this.onChange}/>)}
                        </Form.Item>
                        <Form.Item label="Genre" {...formItemLayout}>
                            {getFieldDecorator('Genre', {initialValue: this.state.movie.Genre})(<Input onChange={this.onChange}/>)}
                        </Form.Item>
                        <Form.Item label="Plot" {...formItemLayout}>
                            {getFieldDecorator('Plot', {initialValue: this.state.movie.Plot})(<Input onChange={this.onChange}/>)}
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        );

    }

}

export default Form.create()(Edit);