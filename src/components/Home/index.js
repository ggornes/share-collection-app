import React, {Component} from 'react';
import './index.css'


import { Player } from 'video-react';
//import "node_modules/video-react/dist/video-react.css";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerSource: 'http://localhost:8000/REZOLUTION-PROMO-MIX.mp3',
            inputVideoUrl: 'http://localhost:8000/REZOLUTION-PROMO-MIX.mp3'
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this.updatePlayerInfo = this.updatePlayerInfo.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.playerSource !== prevState.playerSource) {
            this.player.load();
        }
    }

    handleValueChange(e) {
        const { value } = e.target;
        this.setState({
            inputVideoUrl: value
        });
    }

    updatePlayerInfo() {
        const { inputVideoUrl } = this.state;
        this.setState({
            playerSource: inputVideoUrl
        });
    }

    render() {
        return(
            <div>
                <h1>My collection App</h1>
                <p>Create your own collection</p>
                <p>Search movies using the Open Movie Data Base API</p>
                <p>Add movies to your collections</p>
                <small>Books, Comics and Games collection coming soon...</small>
                <br/>

                {/* <div>
                    <Player
                        ref={player => {
                            this.player = player;
                        }}
                        videoId="video-1"
                    >
                        <source src={this.state.playerSource} />
                    </Player>
                    <div className="docs-example">
                        <Form>
                            <FormGroup>
                                <Label for="inputVideoUrl">Video Url</Label>
                                <Input
                                    name="inputVideoUrl"
                                    id="inputVideoUrl"
                                    value={this.state.inputVideoUrl}
                                    onChange={this.handleValueChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button type="button" onClick={this.updatePlayerInfo}>
                                    Update
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div> */}

                <br/>
                <img alt="movies" className="responsive" src="https://bitrebels.com/wp-content/uploads/2012/10/retro-movie-sharpie-drawings-1.jpg"/>
            </div>
        )
    }


}

export default Home;