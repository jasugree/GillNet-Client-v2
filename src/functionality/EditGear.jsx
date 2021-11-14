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

class EditGear extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.gear, modal: false };
	}

	handleUpdateGear = (e) => {
		e.preventDefault();
		fetch(`${APIURL}/gear/update/${this.state.id}`, {
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
				this.props.updateGears(data, true);
			})
			.catch((error) => {
				console.log("Error", error);
				alert("Something went wrong. Please try again.");
				return;
			});
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
		console.log("clicked");
	};

	render() {
		return (
			<div>
				<span className="editButton" onClick={this.toggle}>
					<i class="fas fa-pen"></i>
				</span>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<Form onSubmit={this.handleUpdateGear}>
						<ModalHeader toggle={this.toggle}>Update Your Gear</ModalHeader>
						<ModalBody className="create-modal">
							<FormGroup>
								<Label htmlFor="description">Gear Type</Label>
								<Input
									type="textarea"
									rows="1"
									placeholder="Add a description to your post..."
									name="description"
									onChange={(e) =>
										this.setState({
											gearType: e.target.value,
										})
									}
									value={this.state.gearType}
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="description">Title</Label>
								<Input
									type="textarea"
									rows="1"
									placeholder="Brown Trout, Catfish..."
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
									placeholder="Brown Trout, Catfish..."
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
									type="textarea"
									rows="1"
									placeholder="Brown Trout, Catfish..."
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
									type="textarea"
									rows="1"
									placeholder="Brown Trout, Catfish..."
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
							<Button id="create-button" type="submit">
								Update Catch
							</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default EditGear;
