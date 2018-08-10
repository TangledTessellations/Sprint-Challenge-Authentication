import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const AllJokes = styled.div`
    padding-top: 5%
    width: 100vw
    height: 100%
    background: linear-gradient(to right, grey, white)

`

const Li = styled.li`
    list-style-type: none
    margin-top: 5%
`

class Jokes extends Component {
    state = {
        jokes: []
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt')

        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios
            .get('http://localhost:5000/api/jokes', requestOptions)
            .then(res => {
                let jokes = res.data
                this.setState({ jokes: jokes })
            })
            .catch(err => {
                console.error("Axios Failed")
            })
    }

    logoutHandler = (e) => {
        localStorage.removeItem('jwt')
    
        this.props.history.push('/signin')
      }

    render() {
    return (
        <AllJokes>
           <ul>
               {this.state.jokes.map(joke => <Li key={joke.id}>ID: {joke.id}<br/> 
                                                                Type: {joke.type}<br/>
                                                                Setup: {joke.setup}<br/>
                                                                punchline: {joke.punchline}<br/></Li>)}
           </ul>
           <div><button onClick={this.logoutHandler}>Logout</button></div>
        </AllJokes>
    );
  }
}

export default Jokes;
