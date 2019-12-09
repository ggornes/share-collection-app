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
import {Search2} from "../Search/moviesAndBooks";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHelp: true,
            showTooltip: false,
            theme: 'dark'
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

    setTheme = () => {
        if(this.state.theme === 'dark') {
            this.setState({
                theme: 'light'
            })
        } else {
            this.setState({
                theme: 'dark'
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
                        theme={this.state.theme}
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
                        <Menu theme={this.state.theme} mode="inline" defaultSelectedKeys={['1']}>
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

                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="folder-open" />
                                        <span>Collections</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="6">Movies</Menu.Item>
                                <Menu.Item key="8">Books</Menu.Item>
                            </SubMenu>

                            <Menu.Item key="3">
                                <Icon type="search" />
                                <span className="nav-text">Search</span>
                                {this.state.showHelp ?
                                    (
                                        <Tooltip title="Search movies by title" placement="right">
                                            <Link to={ROUTES.SEARCH}>Search</Link>
                                        </Tooltip>
                                    )
                                    :
                                    (
                                        <Link to={ROUTES.SEARCH}>Search</Link>
                                    )
                                }
                            </Menu.Item>


                            {/*<Menu.Item key="4">*/}
                            {/*    <Icon type="search" />*/}
                            {/*    <span className="nav-text">Search</span>*/}
                            {/*    {this.state.showHelp ?*/}
                            {/*        (*/}
                            {/*            <Tooltip title="Search movies" placement="right">*/}
                            {/*                <Link to={ROUTES.SEARCH2}>Search2</Link>*/}
                            {/*            </Tooltip>*/}
                            {/*        )*/}
                            {/*        :*/}
                            {/*        (*/}
                            {/*            <Link to={ROUTES.SEARCH2}>Search2</Link>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</Menu.Item>*/}
                            <hr/>


                            <br/>

                            <div style={{ paddingLeft: 24, paddingTop: 15}}>
                                <span ><Icon type="setting"/> Theme       </span>
                                <Switch checkedChildren="Light" unCheckedChildren="Dark" defaultChecked={false} onChange={this.setTheme}/>
                            </div>

                            <div style={{ paddingLeft: 24, paddingTop: 10}}>
                                <Tooltip title="Toggle tooltips over Menu nav links" placement="bottom">
                                <span > Show Help       </span>
                                <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked onChange={this.onChange}/>
                                </Tooltip>
                            </div>


                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: this.state.theme === "dark" ? '#001529' : '#fff', padding: 0 }} />
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>


                                <Route exact path={ROUTES.HOME} component={Home} />
                                <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                                <Route path="/details/:id" component={Details}/>
                                <Route path={ROUTES.SEARCH} component={Search} />

                                <Route path={ROUTES.SEARCH2} component={Search2} />

                            </div>

                        </Content>
                        <Footer style={{ background: this.state.theme === "dark" ? '#001529' : '#fff', color: this.state.theme === "dark" ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.85)', textAlign: 'center',  }}>
                            <p>Ant Design ©2018 Created by Ant UED</p>

                        </Footer>
                    </Layout>
                </Layout>







            </div>
        );

    }

}



export default App;