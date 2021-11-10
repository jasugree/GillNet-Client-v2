import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './auth/Auth.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Nav  from './nav/Nav'

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = { sessionToken: "" }
    }

    componentDidMount() {
      this.setState({
        sessionToken: localStorage.getItem("token") ?? ""
      })
    }

  updateToken = (newToken) => {
      localStorage.setItem("token", newToken);
      this.setState({newToken: localStorage.getItem("token") });
    };
  
  clearToken = () => {
      localStorage.clear();
      this.setState({sessionToken: ""});
    };

    protectedViews = () => {
      return localStorage.getItem("token") ? (
       <Nav clearToken={this.clearToken} sessionToken={this.state.sessionToken}/>
      ) : (
        <Auth updateToken={this.updateToken}/>
      );
    };


    render() { 
      return (
        <div className="App">
          <Router>
            <Switch>
                {this.protectedViews()}
            </Switch>
          </Router>
        </div>
      );
    }
  }
  


export default App;
