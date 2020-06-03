import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

export default function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        Receptai.lt
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/get" className="nav-link">
              Ingredientai
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/recipe" className="nav-link">
              Receptai
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/ingredient" className="nav-link">
              Sukurti ingredientą
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Sukurti receptą
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/calculator" className="nav-link">
              Kalkuliatorius
            </Link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <AuthOptions />
        </ul>
      </div>
    </nav>
  );
}
