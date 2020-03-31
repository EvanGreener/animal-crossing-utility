import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class ToggleSwitch extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <React.Fragment>
                <div class="toggle_header">
                    <Button
                        content="Menu"
                        inverted
                        color="teal"
                        icon="folder open outline"
                        labelPosition="left"
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default ToggleSwitch
