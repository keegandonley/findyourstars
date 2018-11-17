import React, { Component } from 'react';
import { Route } from "react-router-dom";
import * as Screens from './screens';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" exact component={Screens.Landing} />
        <Route path='/map' component={Screens.Map}/>
      </React.Fragment>
    );
  }
}

export default App;
