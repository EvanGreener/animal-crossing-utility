import React, { Component } from 'react'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebarVisible: false,
        }
    }

    render() {
        return (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    inverted
                    onHide={this.props.setInvisible}
                    vertical
                    visible={this.state.sidebarVisible}
                    width="thin"
                >
                    <Menu.Item as="a">
                        <Icon name="home" />
                        Home
                    </Menu.Item>
                    <Menu.Item as="a">
                        <Icon name="gamepad" />
                        Games
                    </Menu.Item>
                    <Menu.Item as="a">
                        <div class="ui category search">
                            <div class="ui icon input">
                                <input
                                    class="prompt"
                                    type="text"
                                    placeholder="Search critters..."
                                />
                                <i class="search icon"></i>
                            </div>
                            <div class="results"></div>
                        </div>
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher
                    className="content"
                    dimmed={this.state.sidebarVisible}
                >
                    {this.props.children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )

        // return (
        //     <div class="ui bottom attached segment pushable">
        //         <div className="ui left demo vertical inverted sidebar labeled icon menu">
        //             <a className="item" href="/">
        //                 <img src={logo} alt="logo" width="100" height="150" />
        //             </a>
        //             <a className="item" href="/">
        //                 <i className="home icon"></i>
        //                 Home
        //             </a>
        //             <a className="item" href="/">
        //                 <i class="file code outline icon"></i>
        //                 API Docs
        //             </a>
        //             <div className="item">
        //                 <div class="ui category search">
        //                     <div class="ui icon input">
        //                         <input
        //                             class="prompt"
        //                             type="text"
        //                             placeholder="Search critters..."
        //                         />
        //                         <i class="search icon"></i>
        //                     </div>
        //                     <div class="results"></div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // )
    }
}

export default NavBar
