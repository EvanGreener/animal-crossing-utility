import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import ToggleSwitch from '../components/ToggleSwitch'

class Home extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <ToggleSwitch />
                <Sidebar>Heyyyyyyyy</Sidebar>
            </React.Fragment>
        )
    }
}

export default Home
