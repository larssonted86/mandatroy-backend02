import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './styles/css/App.css';
import Boardwindow from './components/Boardwindow'
import Listwindow from './components/Listwindow'
import Itemwindow from './components/ItemWindow'


function App() {
  return (
    <div className="App">
      <Router>        
        <div className='content'>
        <Route exact path="/">
            <Boardwindow />
          </Route>
          <Route path="/api/lists/:bid">
            <Listwindow />
          </Route>
          <Route path="/api/items/:lid">
            <Itemwindow />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
