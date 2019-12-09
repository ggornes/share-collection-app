import React, {Component} from 'react';
import * as ROUTES from '../Constants/routes';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Navigation from "../Navigation";
import Dashboard from "../Dashboard";
import Search from "../Search";
import Details from "../Details";

import { Tooltip } from 'antd';
import { Switch } from 'antd';


import Home from "../Home";
import Landing from '../Home';
// import AddPage from '../Add/Add'
// import BrowsePage from '../Dashboard/Browse';
// import DetailsPage2 from '../Details/Details2'
// import DetailsPage3 from '../Details/Details3'
// import Navbar from '../Navigation/Navbar';
// import * as ROUTES from '../../constants/routes';
// import EditVehicle from "../EditVehicle/EditVehicle";

import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHelp: true,
            showTooltip: false
        }
    }

    componentDidMount() {
    }

    onChange = () => {
        if(this.state.showHelp) {
            this.setState({
                showHelp: false
            })
        } else {
            this.setState({
                showHelp: true
            })
        }
    };

    mouseOver = () => {
        this.setState({
            showTooltip: true,
        })
    };

    mouseOut = () => {
        this.setState({
            showTooltip: false,
        })
    };


    render() {
        return (
            <div>




                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="home" />
                                <span className="nav-text">Home</span>
                                    <Link to={ROUTES.HOME}>Home</Link>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Icon type="profile" />
                                <span className="nav-text">Dashboard</span>
                                {this.state.showHelp ?
                                    (
                                    <Tooltip title="Shows all my collections" placement="right">
                                        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                                    </Tooltip>
                                    )
                                    :
                                    (
                                        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                                    )
                                }

                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="folder-open" />
                                <span className="nav-text">Movies</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="search" />
                                <span className="nav-text">Search</span>
                                {this.state.showHelp ?
                                    (
                                        <Tooltip title="Search movies" placement="right">
                                            <Link to={ROUTES.SEARCH}>Search</Link>
                                        </Tooltip>
                                    )
                                    :
                                    (
                                        <Link to={ROUTES.SEARCH}>Search</Link>
                                    )
                                }
                            </Menu.Item>
                            <hr/>
                            <div>

                                <Tooltip title="Toggle tooltips over Menu nav links" placement="bottom">
                                <span>Show help</span>
                                </Tooltip>
                                <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked onChange={this.onChange}/>
                            </div>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#0f0f0f', padding: 0 }} />
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                                <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                                <Route path="/details/:id" component={Details}/>
                                <Route path={ROUTES.SEARCH} component={Search} />

                            </div>

                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>







            </div>
        );

    }

}



export default App;