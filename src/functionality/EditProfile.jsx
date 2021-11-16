import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	Label,
	FormFeedback,
	FormText,
	FormGroup,
	Input,
	Row,
	Col,
	InputGroupText,
	InputGroup,
} from "reactstrap";
import "../nav/nav.css";
import ProfilePic from "./ProfilePic";
import "./EditProfile.css";
import APIURL from "../helpers/environments";

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.user, modal: false };
	}

	handleUpdateProfile = (e) => {
		e.preventDefault();
		fetch(`${APIURL}/user/updateprofile`, {
			method: "PUT",
			body: JSON.stringify(this.state),
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.props.sessionToken,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.toggle();
				this.props.updateUser(this.state);
				// window.location.reload();
			});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			this.setState({
				...this.state,
				...this.props.user,
			});
		}
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	setImage = (url) => {
		this.setState({
			profileImage: url,
		});
	};

	render() {
		console.log(this.props.user);
		console.log("MARCOOOOOOOOO");
		return (
			<div>
				<div className="editProfile" onClick={this.toggle}>
					<i className="fas fa-ellipsis-h"></i>
				</div>

				<Modal
					style={{ maxWidth: "800px" }}
					isOpen={this.state.modal}
					toggle={this.toggle}
				>
					<Form
						onSubmit={this.handleUpdateProfile}
						method="post"
						enctype="multipart/form-data"
					>
						<ModalHeader toggle={this.toggle}>Update Your Profile</ModalHeader>
						<ModalBody className="create-modal">
							<Row className="firstRow">
								<Col>
									<FormGroup>
										<ProfilePic
											image={this.state.profileImage}
											setImage={this.setImage}
											handleUpdateProfile={this.handleUpdateProfile}
										/>
									</FormGroup>
								</Col>
								<Col className="nexToPic">
									<FormGroup>
										<Label htmlFor="description">First Name</Label>
										<Input
											type="textarea"
											rows="1"
											name="description"
											onChange={(e) =>
												this.setState({
													firstName: e.target.value,
												})
											}
											value={this.state.firstName}
										/>
									</FormGroup>
									<FormGroup>
										<Label htmlFor="description">Last Name</Label>
										<Input
											id="description"
											type="textarea"
											rows="1"
											name="description"
											onChange={(e) =>
												this.setState({
													lastName: e.target.value,
												})
											}
											value={this.state.lastName}
										/>
									</FormGroup>
									<FormGroup>
										<Label htmlFor="description">Email</Label>
										<Input
											type="email"
											rows="1"
											name="description"
											onChange={(e) =>
												this.setState({
													email: e.target.value,
												})
											}
											value={this.state.email}
										/>
									</FormGroup>
								</Col>
							</Row>
							<FormGroup className="descrip">
								<Label htmlFor="description">Description</Label>
								<Input
									type="textarea"
									rows="5"
									name="description"
									onChange={(e) =>
										this.setState({
											description: e.target.value,
										})
									}
									value={this.state.description}
								/>
							</FormGroup>
							<Row>
								<Col>
									<FormGroup>
										<Label htmlFor="description">Age</Label>
										<Input
											min="0"
											type="number"
											rows="1"
											name="description"
											onChange={(e) =>
												this.setState({
													age: e.target.value,
												})
											}
											value={this.state.age}
										/>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label htmlFor="description">City</Label>
										<Input
											type="textarea"
											rows="1"
											name="description"
											onChange={(e) =>
												this.setState({
													city: e.target.value,
												})
											}
											value={this.state.city}
										/>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label htmlFor="description">State</Label>
										<Input
											type="select"
											rows="1"
											id="state"
											name="state"
											onChange={(e) =>
												this.setState({
													state: e.target.value,
												})
											}
											value={this.state.state}
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
								<Col>
									<FormGroup>
										<Label htmlFor="description" className="admin">
											Admin
										</Label>
										<Input
											className="admin"
											type="checkbox"
											rows="1"
											name="admin"
											// onChange={(e) =>
											// 	this.setState({
											// 		admin: e.target.value,
											// 	})
											// }
											onChange={() =>
												this.setState({
													admin: !this.state.admin,
												})
											}
											defaultChecked={this.state.admin}
											value={this.state.admin}
										/>
									</FormGroup>
								</Col>
							</Row>
						</ModalBody>
						<ModalFooter>
							<Button className="editProfile-button" type="submit">
								Update Your Profile
							</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default EditProfile;
