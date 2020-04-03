import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

// Views
import Home from './views/index'

// Global styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui/dist/semantic.min.css'
import './assets/app.css'
import 'react-virtualized/styles.css'

ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={Home} exact />
    </BrowserRouter>,
    document.getElementById('root')
)
