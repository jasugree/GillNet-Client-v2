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

class DeleteFish extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.fish, modal: false };
	}

	handleDeleteFish = (e) => {
		e.preventDefault();
		fetch(`http://localhost:3000/fish/delete/${this.state.id}`, {
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
				this.props.updateFishes(data, true);
				window.location.reload();
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
				<span
					className="editButton"
					onClick={this.toggle}
					style={
						this.props.profile
							? {}
							: {
									display:
										this.props.fish?.user?.userName == this.props.user?.userName
											? "auto"
											: "none",
							  }
					}
				>
					<i className="fas fa-backspace"></i>
				</span>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Delete Fish</ModalHeader>
					<ModalBody className="create-modal">
						<p style={{ color: "red" }}>
							Are you sure you want to delete this post?
						</p>
						<Button id="create-button" onClick={this.handleDeleteFish}>
							Delete Catch
						</Button>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default DeleteFish;
