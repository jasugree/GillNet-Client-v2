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
      this.state = { sessionToken: "", user: null }
    }

    authorize = (token) =>{
      fetch("http://localhost:3000/user/authorize",{
        method: "GET",
        headers: new Headers ({
          "Content-Type": "application/json",
          Authorization: token,
      }),
      })
      .then((res) => res.json())
        .then((json) => {
          console.log(json.user);
          this.setState({user: json.user})
        })
        .catch((error) => {
          console.log("Error", error);
          alert("Something went wrong. Please try again.")
          return
        });
    }


    updateUser = (user) =>{
      this.setState({user});  
    }


    componentDidMount() {
      this.setState({
        sessionToken: localStorage.getItem("token") ?? ""
      })
      this.authorize(localStorage.getItem("token"))
    }

  updateToken = (newToken) => {
      localStorage.setItem("token", newToken);
      this.setState({sessionToken: localStorage.getItem("token") });
    };
  
  clearToken = () => {
      localStorage.clear();
      this.setState({sessionToken: ""});
    };

    protectedViews = () => {
      return localStorage.getItem("token") && this.state.sessionToken ? (
       <Nav clearToken={this.clearToken} sessionToken={this.state.sessionToken} updateUser={this.updateUser} user={this.state.user}/>
      ) : (
        <Auth updateToken={this.updateToken} updateUser={this.updateUser}/>
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
