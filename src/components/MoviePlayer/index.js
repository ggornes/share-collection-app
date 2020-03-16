import React, {Component} from 'react';



import { Player } from 'video-react';
//import "node_modules/video-react/dist/video-react.css";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class MoviePlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerSource: 'https://www.w3schools.com/html/mov_bbb.mp4',
            inputVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
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
                <h1>Movie of the week</h1>

                <div id="moviePlayer">
                    <Player
                        ref={player => {
                            this.player = player;
                        }}
                        videoId="video-1"
                    >
                        <source src={this.state.playerSource} />
                        {/* <track
                            kind="captions"
                            src="http://host:port/sub.vtt"
                            srcLang="en"
                            label="English"
                            default
                        /> */}
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
                </div>
            </div>
        )
    }


}

export default MoviePlayer;