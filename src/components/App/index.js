import React, {Component} from 'react';
import * as ROUTES from '../Constants/routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from "../Navigation";
import Dashboard from "../Dashboard";
import Landing from '../Landing/Landing';
// import AddPage from '../Add/Add'
// import BrowsePage from '../Dashboard/Browse';
// import DetailsPage2 from '../Details/Details2'
// import DetailsPage3 from '../Details/Details3'
// import Navbar from '../Navigation/Navbar';
// import * as ROUTES from '../../constants/routes';
// import EditVehicle from "../EditVehicle/EditVehicle";

export class App extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <header>
                    <h1>hello</h1>
                    <Router>
                        <Navigation/>
                        <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                    </Router>
                </header>

            </div>
        );

    }

}



export default App;