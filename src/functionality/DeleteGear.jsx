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

class DeleteGear extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.gear, modal: false };
	}

	handleDeleteGear = (e) => {
		e.preventDefault();
		fetch(`${APIURL}/gear/delete/${this.state.id}`, {
			method: "DELETE",
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
				// this.props.updateFishes(data, true);
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
		const userName = localStorage.getItem("userName");
		return (
			<div>
				<span className="editButton" onClick={this.toggle}>
					<i className="fas fa-backspace"></i>
				</span>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Delete Gear</ModalHeader>
					<ModalBody className="create-modal">
						<p style={{ color: "red" }}>
							Are you sure you want to delete this Gear?
						</p>
						<Button id="create-button" onClick={this.handleDeleteGear}>
							Delete Catch
						</Button>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default DeleteGear;