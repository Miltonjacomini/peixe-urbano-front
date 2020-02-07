import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/global.css';
import '../../css/Main.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function Container({ children }) {
 
  return (
    <div className="App">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={'/'} className="navbar-brand">Peixe Urbano - Ofertas </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={'/deal'} className="nav-link">Deal</Link>
              </li>
              <li className="nav-item">
                <Link to={'/buy-option'} className="nav-link">Buy Option</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <main>
          { children }
        </main>
      </div>
    </div>
  );
}

export default Container;
