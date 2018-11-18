import React, { Component } from 'react';
import Logo from '../../resources/findyourstars_logo.svg';
import {Wrapper, Switch, Slider} from './components';

export default class ToggleSwitch extends Component {

    state = {
        enabled: false
    }

    clickHandler() {
        this.state.enabled ? this.setState({enabled: false}) : this.setState({enabled: true});
        this.props.clickHandler();
    }

  render() {
    return (
        <Wrapper>
            <Switch enabled={this.state.enabled}>
                <Slider 
                    onClick={()=>this.clickHandler()}
                    enabled={this.state.enabled}
                />
            </Switch>
            {this.props.label}
        </Wrapper>
    )
  }
}