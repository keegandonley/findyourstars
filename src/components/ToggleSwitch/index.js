import React, { Component } from 'react';
import {Wrapper, Switch, Slider} from './components';

export default class ToggleSwitch extends Component {

    state = {
        enabled: true
    }

    clickHandler() {
        this.state.enabled ? this.setState({enabled: false}) : this.setState({enabled: true});
        this.props.clickHandler();
    }

  render() {
    return (
        <Wrapper>
            <Switch 
                enabled={this.state.enabled}
                onClick={()=>this.clickHandler()}
            >
                <Slider enabled={this.state.enabled}/>
            </Switch>
            {this.props.label}
        </Wrapper>
    )
  }
}