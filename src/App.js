import React, { Component } from 'react';
import { Route } from "react-router-dom";
import * as Screens from './screens';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route route="/" exact component={Screens.Landing} />
      </React.Fragment>
    );
  }
}

export default App;
