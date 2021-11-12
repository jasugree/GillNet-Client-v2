import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
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

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = { email: "", password: "", toggle: true };
	}

	handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:3000/user/create", {
			method: "POST",
			body: JSON.stringify({
				userName: this.state.username,
				email: this.state.email,
				city: this.state.city,
				state: this.state.state,
				passwordhash: this.state.password,
			}),
			headers: new Headers({
				"Content-Type": "application/json",
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (!data.sessionToken) {
					alert(
						"One or more fields is not properly filled out. Please try again."
					);
					return;
				}
				this.props.updateToken(data.sessionToken);
			})
			.catch((error) => {
				console.log("Error", error);
				alert("Something went wrong. Please try again.");
				return;
			});
	};

	render() {
		return (
			<div className="wrapper">
				<img src={BrandLogo} alt="logo" className="auth-logo" />
				<Form className="authForm" onSubmit={this.handleSubmit}>
					<Row>
						<Col>
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
									placeholder="Please enter a Username"
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label className="fieldlabel ">Email</Label>
								<Input
									className="formfield"
									type="email"
									onChange={(e) =>
										this.setState({
											email: e.target.value,
										})
									}
									name="email"
									id="email"
									placeholder="example@example.com"
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormGroup>
								<Label className="fieldlabel ">City</Label>
								<Input
									className="formfield"
									type="text"
									onChange={(e) =>
										this.setState({
											city: e.target.value,
										})
									}
									name="username"
									id="username"
									placeholder="What city do you fish in?"
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label className="fieldlabel ">State</Label>
								<Input
									className="formfield"
									type="select"
									onChange={(e) =>
										this.setState({
											state: e.target.value,
										})
									}
									name="state"
									id="state"
									placeholder="Please Select a State"
								>
									<option value="" selected disabled hidden>
										Please select a State
									</option>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
									<option value="AZ">Arizona</option>
									<option value="AR">Arkansas</option>
									<option value="CA">California</option>
									<option value="CO">Colorado</option>
									<option value="CT">Connecticut</option>
									<option value="DE">Delaware</option>
									<option value="DC">District Of Columbia</option>
									<option value="FL">Florida</option>
									<option value="GA">Georgia</option>
									<option value="HI">Hawaii</option>
									<option value="ID">Idaho</option>
									<option value="IL">Illinois</option>
									<option value="IN">Indiana</option>
									<option value="IA">Iowa</option>
									<option value="KS">Kansas</option>
									<option value="KY">Kentucky</option>
									<option value="LA">Louisiana</option>
									<option value="ME">Maine</option>
									<option value="MD">Maryland</option>
									<option value="MA">Massachusetts</option>
									<option value="MI">Michigan</option>
									<option value="MN">Minnesota</option>
									<option value="MS">Mississippi</option>
									<option value="MO">Missouri</option>
									<option value="MT">Montana</option>
									<option value="NE">Nebraska</option>
									<option value="NV">Nevada</option>
									<option value="NH">New Hampshire</option>
									<option value="NJ">New Jersey</option>
									<option value="NM">New Mexico</option>
									<option value="NY">New York</option>
									<option value="NC">North Carolina</option>
									<option value="ND">North Dakota</option>
									<option value="OH">Ohio</option>
									<option value="OK">Oklahoma</option>
									<option value="OR">Oregon</option>
									<option value="PA">Pennsylvania</option>
									<option value="RI">Rhode Island</option>
									<option value="SC">South Carolina</option>
									<option value="SD">South Dakota</option>
									<option value="TN">Tennessee</option>
									<option value="TX">Texas</option>
									<option value="UT">Utah</option>
									<option value="VT">Vermont</option>
									<option value="VA">Virginia</option>
									<option value="WA">Washington</option>
									<option value="WV">West Virginia</option>
									<option value="WI">Wisconsin</option>
									<option value="WY">Wyoming</option>
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label className="fieldlabel">Password</Label>
						<Input
							className="formfield"
							type="password"
							onChange={(e) =>
								this.setState({
									password: e.target.value,
								})
							}
							name="password"
							id="examplePassword"
							placeholder="********"
						/>
					</FormGroup>
					<Button className="loginbutton">Sign In</Button>
				</Form>
				<p className="switch">
					Already on GillNet?{" "}
					<Link className="auth-toggle-link" to="/" variant="body2">
						Sign in
					</Link>
				</p>
			</div>
		);
	}
}

export default Register;
