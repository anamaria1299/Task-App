import * as serviceWorker from './serviceWorker'
import ReactDOM from 'react-dom'
import {App} from './App'
import React from 'react'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
