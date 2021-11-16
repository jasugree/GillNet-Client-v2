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

class AdminDeleteUser extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.user, modal: false };
	}

	handleDeleteUser = (e) => {
		e.preventDefault();
		fetch(`${APIURL}/user/admindelete/${this.state.id}`, {
			method: "DELETE",
			body: JSON.stringify(this.state),
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.props.sessionToken,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				this.toggle();
				this.props.updateUsers(data, true);
				// this.props.updateGears(data, true);
			})
			.catch((error) => {
				alert("Something went wrong. Please try again. DELETING USER");
				return;
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
				<Button className="delete" onClick={this.toggle}>
					<i class="fas fa-trash-alt" style={{ marginRight: "0px" }}></i>
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Delete User</ModalHeader>
					<ModalBody className="delete-modal">
						<p>Are you sure you want to delete this user?</p>
						<Button
							id="create-button"
							className="editProfile-button"
							onClick={this.handleDeleteUser}
						>
							Delete Catch
						</Button>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default AdminDeleteUser;
