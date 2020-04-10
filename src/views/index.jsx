import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import SidebarToggle from '../components/SidebarToggle'
import { Header, Icon, Grid, Checkbox, Divider } from 'semantic-ui-react'
import { MenuOpen } from '@material-ui/icons'
import { Fab } from '@material-ui/core'
import CritterList from '../components/CritterList'

class Home extends Component {
    state = {
        time: new Date(),
        sidebarVisible: false,
        allDay: true,
    }

    componentDidMount() {
        /**
         * Update the time display every second
         */
        setInterval(() => this.setState({ time: new Date() }), 1000)
    }

    render() {
        const { time, sidebarVisible, allDay } = this.state
        let hours = time.getHours()
        let mins = time.getMinutes()
        let secs = time.getSeconds()

        hours = hours < 10 ? '0' + hours : hours
        mins = mins < 10 ? '0' + mins : mins
        secs = secs < 10 ? '0' + secs : secs

        return (
            <React.Fragment>
                <SidebarToggle onClick={this.handleSidebarToggle} />
                <Sidebar visible={sidebarVisible} onHide={this.handleOnHide}>
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
                        {`${hours}:${mins}:${secs}`}
                    </code>

                    <Grid className="content-grid">
                        <Grid.Column className="filters" width={2}>
                            <p>Obtainable all day:</p>
                            <Checkbox
                                defaultChecked
                                toggle
                                onChange={this.handleAllDayToggle}
                            />

                            <Divider inverted />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <div id="tablecontainer">
                                <CritterList allDay={allDay} type="both" />
                            </div>
                        </Grid.Column>
                    </Grid>
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

    handleAllDayToggle = () => {
        this.setState({ allDay: !this.state.allDay })
    }
}

export default Home
