import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';

ReactDOM.render(<App numOfCards={5} />, document.getElementById('root'));
registerServiceWorker();
