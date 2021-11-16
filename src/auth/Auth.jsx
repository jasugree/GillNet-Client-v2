import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "./auth.css";

class Auth extends Component {
	url = `https://api.unsplash.com/photos/random?client_id=T5WEdHgQDlbI9ti9NQpmqDD7QijAjNf2RWGPzo_PkI4&orientation=portrait&query=fishing`;
	constructor(props) {
		super(props);
		this.state = { loginImage: "" };
	}

	handleFetch = async () => {
		try {
			const response = await fetch(this.url);
			const jsonData = await response.json();
			this.setState({
				loginImage:
					jsonData.urls?.regular ??
					"https://images.unsplash.com/photo-1462927346281-d1727e290082?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzMyMjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYwNDQ3MTg&ixlib=rb-1.2.1&q=85",
			});
		} catch (e) {
			console.log("Whoops... looks like the image didn't load");
		}
	};
	componentDidMount() {
		this.handleFetch();
	}

	render() {
		return (
			<Container style={{ maxWidth: "100%" }}>
				<Row>
					<Col
						className="authWrapper"
						style={{
							height: "100vh",
							backgroundImage: /*"url(https://images.unsplash.com/photo-1462927346281-d1727e290082?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzMyMjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYwNDQ3MTg&ixlib=rb-1.2.1&q=85)" */ `url(${this.state.loginImage})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					></Col>
					<Col className="form" style={{ backgroundColor: "#22577a" }}>
						<Router>
							<Route exact path="/">
								<Login
									updateToken={this.props.updateToken}
									updateUser={this.props.updateUser}
								/>
							</Route>
							<Route exact path="/register">
								<Register
									updateToken={this.props.updateToken}
									updateUser={this.props.updateUser}
								/>
							</Route>
						</Router>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Auth;
