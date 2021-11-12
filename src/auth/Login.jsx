import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import './auth.css'
import BrandLogo from '../assets/GillNet-light.svg'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: ""}
        
    }

handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/login", {
        method: "POST",
        body: JSON.stringify({ userName: this.state.username, passwordhash: this.state.password }),
        headers: new Headers ({
            "Content-Type": "application/json",
        }),
    })
    .then((response) => response.json())
      .then((data) => {
          console.log(data)
        if(!data.sessionToken){
          alert("Username or Password is incorrect. Please try again.")
          return
        }
        this.props.updateToken(data.sessionToken);
        this.props.history.push("/home")
        console.log(data.user)
        console.log('GO HERE GO HERE')
        // localStorage.setItem("profileImage",data.user.profileImage)
        // localStorage.setItem("userName",data.user.userName)
        // localStorage.setItem("userid",data.user.id)
        // localStorage.setItem("firstName",data.user.firstName)
        // localStorage.setItem("lastName",data.user.lastName)
        this.props.updateUser(data.user);
        window.location.reload();
    })
    .catch((error) => {
        console.log("Error", error);
        alert("Something went wrong. Please try again.")
        return
    })
}




    render() { 
        return ( 
        <div className="wrapper">
            <img
          src={BrandLogo}
          alt="logo"
          className="auth-logo"
          style={{ width: 300, margin: "auto" }}
        />
            <Form className="authForm" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label className="fieldlabel ">Username</Label>
                    <Input
                        className="formfield"
                        type="text"
                        onChange={(e) => this.setState({
                            username: e.target.value
                        })}
                        name="username"
                        id="username"
                        value={this.state.username}
                        placeholder="Enter your username"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="fieldlabel">Password</Label>
                    <Input
                        className="formfield"
                        type="text"
                        onChange={(e) => this.setState({
                            password: e.target.value
                        })}
                        name="password"
                        id="examplePassword"
                        value={this.state.password}
                        placeholder="********"
                    />
                </FormGroup>
                <Button className="loginbutton" type="submit">Sign In</Button>
            </Form>
                <p className="switch">New to GillNet? <Link className="auth-toggle-link" to="/register" variant="body2">Join Now</Link>
                </p>
            
        </div> );
    }
}
 
export default withRouter (Login);