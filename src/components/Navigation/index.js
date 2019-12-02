import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../Constants/routes';
import Dashboard from "../Dashboard/index.js";

const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
            </li>



        </ul>
    </div>
);

export default Navigation;