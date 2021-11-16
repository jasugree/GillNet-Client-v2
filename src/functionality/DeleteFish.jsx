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

class DeleteFish extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.fish, modal: false };
	}

	handleDeleteFish = (e) => {
		e.preventDefault();
		fetch(`${APIURL}/fish/delete/${this.state.id}`, {
			method: "DELETE",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.props.sessionToken,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				this.props.updateFishes(data, true);
				this.props.fetchPost();
				this.props.fetchUsers();

				this.toggle();
			})
			.catch((error) => {
				alert("Something went wrong. Please try again.");
				return;
			});
	};

	componentDidUpdate(prevprops, prevstate) {
		if (prevprops.fish !== this.props.fish) {
			this.setState({ ...this.props.fish });
		}
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
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
					<ModalBody className="delete-modal">
						<p>Are you sure you want to delete this post?</p>
						<Button
							id="create-button"
							className="editProfile-button"
							onClick={this.handleDeleteFish}
						>
							Delete Catch
						</Button>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default DeleteFish;
