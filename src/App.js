import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as Screens from './screens';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Screens.Landing} />
          <Route path='/map' component={Screens.Map}/>
        </div>
      </Router>
    );
  }
}

export default App;
