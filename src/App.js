import React from "react";
import Homepage from "./components/Homepage";
import Form from "./components/Form";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/pizza">Form</Link>
        </li>
      </nav>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/pizza" component={Form} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
