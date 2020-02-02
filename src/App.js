import React from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Peixe Urbano - Ofertas </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>

        </div>
      </Router>
    </div>
  );
}

export default App;
