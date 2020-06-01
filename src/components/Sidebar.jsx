import React, { Component } from 'react'
import { Icon, Menu, Sidebar, Segment } from 'semantic-ui-react'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="push"
                    icon="labeled"
                    onHide={() => this.props.onHide()}
                    vertical
                    visible={this.props.visible}
                    width="thin"
                >
                    <Menu.Item as="a">
                        <Icon inverted color="teal" name="home" />
                        Home
                    </Menu.Item>
                    <Menu.Item as="a">
                        <Icon inverted color="teal" name="file code outline" />
                        API Docs
                    </Menu.Item>
                    <Menu.Item as="a">
                        <Icon inverted color="teal" name="help circle" />
                        Help
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher className="content" dimmed={this.props.visible}>
                    <Segment basic>{this.props.children}</Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

export default NavBar
