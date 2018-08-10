import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Jokes from './components/jokes/Jokes'
import { withRouter } from 'react-router'
import AuthContainer from './components/auth/AuthContainer'
import styled from 'styled-components'

const Background = styled.div`
  background: black
  min-height: 100%
  height: 100vh
`

class App extends Component {
  render() {
    return (
      <Background className="App">
        <Route path='/signin' component={AuthContainer} />
        <Route path='/jokes' component={Jokes} />
      </Background>
    );
  }
}

export default withRouter(App);
