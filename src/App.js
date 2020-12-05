import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddAnimal from "./components/AddAnimal";
import Animal from "./components/Animal";
import AnimalsList from "./components/AnimalsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/animals" className="navbar-brand">
          Leonel Rojas
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/animals"} className="nav-link">
              Animals
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/animals"]} component={AnimalsList} />
          <Route exact path="/add" component={AddAnimal} />
          <Route path="/animals/:id" component={Animal} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
