import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import ToggleSwitch from '../components/ToggleSwitch'
import { Header, Icon } from 'semantic-ui-react'

class Home extends Component {
    state = {
        sidebarVisible: false,
        time: new Date(),
    }

    componentDidMount() {
        setInterval(() => this.setState({ time: new Date() }), 1000)
    }

    render() {
        const { time } = this.state
        return (
            <React.Fragment>
                <ToggleSwitch onClick={this.handleSidebarToggle} />
                <Sidebar
                    visible={this.state.sidebarVisible}
                    onHide={this.handleOnHide}
                >
                    <Header as="h2" icon>
                        <Icon name="settings" />
                        All Obtainable Critters
                        <Header.Subheader>
                            Updates in real time
                        </Header.Subheader>
                    </Header>
                    <br />
                    <code key="time" id="current-time">
                        {time.toLocaleTimeString()}
                    </code>
                </Sidebar>
            </React.Fragment>
        )
    }

    handleSidebarToggle = () => {
        this.setState({ sidebarVisible: true })
    }

    handleOnHide = () => {
        this.setState({ sidebarVisible: false })
    }
}

export default Home
