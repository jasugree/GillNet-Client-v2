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
import APIURL from "../helpers/environments";
import "../nav/nav.css";

class GearCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			gearType: "",
			title: "",
			brand: "",
			price: 0,
			userRating: 0,
		};
	}

	handleGearCreate = (e) => {
		e.preventDefault();
		fetch(`${APIURL}/gear/create`, {
			method: "POST",
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
				// this.props.updateFishes(data);
				window.location.reload();
			});
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	render() {
		return (
			<div>
				<li className="navItem" onClick={this.toggle}>
					<i className="fas fa-toolbox"></i>
					<br />
					<span>Add Tackle Gear</span>
				</li>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<Form onSubmit={this.handleGearCreate}>
						<ModalHeader toggle={this.toggle}>Add Your Gear</ModalHeader>
						<ModalBody className="create-modal">
							<FormGroup>
								<Label className="fieldlabel">Gear Type</Label>
								<Input
									className="formfield"
									type="select"
									rows="1"
									placeholder="Please Select a Gear"
									name="gear type"
									id="state"
									onChange={(e) =>
										this.setState({
											gearType: e.target.value,
										})
									}
									value={this.state.gearType}
									required
								>
									<option value="" selected disabled hidden>
										Please select a State
									</option>
									<option value="Lure">Lure</option>
									<option value="Rod">Rod</option>
									<option value="Line">Line</option>
									<option value="Reel">Reel</option>
									<option value="Other Equipment">Other Equipment</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="description">Title</Label>
								<Input
									type="textarea"
									rows="1"
									placeholder="Specific Model or Make"
									name="description"
									onChange={(e) =>
										this.setState({
											title: e.target.value,
										})
									}
									value={this.state.title}
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="description">Brand</Label>
								<Input
									type="textarea"
									rows="1"
									placeholder="Rapala, Shimano, etc."
									name="description"
									onChange={(e) =>
										this.setState({
											brand: e.target.value,
										})
									}
									value={this.state.brand}
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="description">Price</Label>
								<Input
									min="0"
									type="number"
									rows="1"
									placeholder="0"
									name="description"
									onChange={(e) =>
										this.setState({
											price: e.target.value,
										})
									}
									value={this.state.price}
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="description">User Rating</Label>
								<Input
									min="0"
									max="5"
									type="number"
									rows="1"
									placeholder="0"
									name="description"
									onChange={(e) =>
										this.setState({
											userRating: e.target.value,
										})
									}
									value={this.state.userRating}
									required
								/>
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button
								id="create-button"
								className="editProfile-button"
								type="submit"
							>
								Post Your Gear
							</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default GearCreate;
