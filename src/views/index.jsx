import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import ToggleSwitch from '../components/ToggleSwitch'
import { Header, Icon } from 'semantic-ui-react'
import { MenuOpen } from '@material-ui/icons'
import { Fab } from '@material-ui/core'
import CritterList from '../components/CritterList'

class Home extends Component {
    state = {
        time: new Date(),
        sidebarVisible: false,
    }

    componentDidMount() {
        /**
         * Update the time display every second
         */
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
                    <Header as="h2">
                        <Icon name="leaf" color="green" />
                        <Header.Content>
                            All Obtainable Critters
                            <Header.Subheader>
                                Updates in real time
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    <br />
                    <code key="time" id="current-time">
                        {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
                    </code>

                    <div id="tablecontainer">
                        <CritterList />
                    </div>
                </Sidebar>

                <Fab
                    onClick={this.handleSidebarToggle}
                    size="large"
                    color="primary"
                    aria-label="add"
                >
                    <MenuOpen />
                </Fab>
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
