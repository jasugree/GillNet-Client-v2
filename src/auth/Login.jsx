import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
	Button,
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
} from "reactstrap";
import "./auth.css";
import BrandLogo from "../assets/GillNet-light.svg";
import APIURL from "../helpers/environments";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "", toggle: true };
	}

	handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${APIURL}/user/login`, {
			method: "POST",
			body: JSON.stringify({
				userName: this.state.username,
				passwordhash: this.state.password,
			}),
			headers: new Headers({
				"Content-Type": "application/json",
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (!data.sessionToken) {
					alert("Username or Password is incorrect. Please try again.");
					return;
				}
				this.props.updateToken(data.sessionToken);
				this.props.history.push("/home");
				this.props.updateUser(data.user);
				window.location.reload();
			})
			.catch((error) => {
				alert("Something went wrong. Please try again. LOGIN");
				return;
			});
	};

	toggle = () => {
		this.setState({
			toggle: !this.state.toggle,
		});
	};

	render() {
		return (
			<div className="wrapper">
				<img src={BrandLogo} alt="logo" className="auth-logo" />
				<Form className="authForm" onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label className="fieldlabel ">Username</Label>
						<Input
							className="formfield"
							type="text"
							onChange={(e) =>
								this.setState({
									username: e.target.value,
								})
							}
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
							type={this.state.toggle === true ? "password" : "text"}
							onChange={(e) =>
								this.setState({
									password: e.target.value,
								})
							}
							name="password"
							id="examplePassword"
							value={this.state.password}
							placeholder="Enter your password"
						/>
						<i
							className={
								this.state.toggle === true
									? "far fa-eye-slash password-icon"
									: "far fa-eye password-icon"
							}
							onClick={this.toggle}
						/>
					</FormGroup>
					<Button className="loginbutton" type="submit">
						Sign In
					</Button>
				</Form>
				<p className="switch">
					New to GillNet?{" "}
					<Link className="auth-toggle-link" to="/register" variant="body2">
						Join Now
					</Link>
				</p>
			</div>
		);
	}
}

export default withRouter(Login);
