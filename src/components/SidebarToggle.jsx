import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class SidebarToggle extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="toggle_header">
                <Button
                    inverted
                    content="Menu"
                    color="teal"
                    icon="sidebar"
                    onClick={this.props.onClick}
                />
            </div>
        )
    }
}

export default SidebarToggle
