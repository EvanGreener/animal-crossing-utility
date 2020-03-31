import React, { Component } from 'react'
import NavBar from '../components/NavBar'

class Home extends Component {
    state = {}
    render() {
        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <NavBar />
                <div className="content">Hey</div>
            </div>
        )
    }
}

export default Home
