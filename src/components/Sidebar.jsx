import React, { Component } from 'react'
import { Input, Icon, Menu, Sidebar, Segment } from 'semantic-ui-react'
import Axios from 'axios'
import { Backdrop, CircularProgress } from '@material-ui/core'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date(),
            fetchingData: true,
            data: null,
        }
    }

    componentDidMount() {
        /**
         * Retriving data from API on port 9000
         */
        Axios.get(`http://192.168.0.162:9000`).then(response => {
            this.setState({ data: response.data, fetchingData: false })
        })
    }

    render() {
        const { fetchingData, data } = this.state
        console.log(fetchingData || !data)

        return (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="push"
                    icon="labeled"
                    onHide={() => this.props.onHide()}
                    vertical
                    visible={this.props.visible}
                    width="wide"
                >
                    <Menu.Item as="a">
                        <Icon inverted color="teal" name="home" />
                        Home
                    </Menu.Item>
                    <Menu.Item as="a">
                        <Icon inverted color="teal" name="file code outline" />
                        API Docs
                    </Menu.Item>
                    <Menu.Item className="search">
                        <Input icon="search" placeholder="Search..." />
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher className="content" dimmed={this.props.visible}>
                    <Segment basic>
                        {this.props.children}

                        <Backdrop open={fetchingData || !data}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

export default NavBar
