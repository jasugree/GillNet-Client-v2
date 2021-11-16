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

class EditFish extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.fish, modal: false };
	}

	handleUpdateFish = (e) => {
		e.preventDefault();
		fetch(`${APIURL}/fish/update/${this.state.id}`, {
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
				this.props.updateFishes(data, true);
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

	componentDidUpdate(prevprops, prevstate) {
		if (prevprops.fish !== this.props.fish) {
			this.setState({ ...this.props.fish });
		}
	}

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
					<i class="fas fa-pen"></i>
				</span>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<Form onSubmit={this.handleUpdateFish}>
						<ModalHeader toggle={this.toggle}>Update Your Catch</ModalHeader>
						<ModalBody className="create-modal">
							<FormGroup className="descrip">
								<Label htmlFor="description">Caption</Label>
								<Input
									type="textarea"
									rows="5"
									placeholder="Add a description to your post..."
									name="description"
									onChange={(e) =>
										this.setState({
											caption: e.target.value,
										})
									}
									value={this.state.caption}
									required
								/>
							</FormGroup>
							<Row>
								<Col>
									<FormGroup>
										<Label htmlFor="description">Species</Label>
										<Input
											type="textarea"
											rows="1"
											placeholder="Brown Trout, Catfish..."
											name="description"
											onChange={(e) =>
												this.setState({
													species: e.target.value,
												})
											}
											value={this.state.species}
											required
										/>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup className="catch">
										<Label htmlFor="description">Catch and Release?</Label>
										<br />
										<Input
											type="checkbox"
											rows="1"
											onChange={() =>
												this.setState({
													catchAndRelease: !this.state.catchAndRelease,
												})
											}
											defaultChecked={this.state.catchAndRelease}
											value={this.state.catchAndRelease}
											name="description"
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col>
									<FormGroup>
										<Label htmlFor="description">Weight</Label>
										<InputGroup>
											<Input
												type="number"
												rows="1"
												placeholder="0"
												onChange={(e) =>
													this.setState({
														weight: e.target.value,
													})
												}
												value={this.state.weight}
												name="description"
												required
												addon
											/>
											<InputGroupText>lb</InputGroupText>
										</InputGroup>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label htmlFor="description">Length</Label>
										<InputGroup>
											<Input
												type="number"
												rows="1"
												placeholder="0"
												onChange={(e) =>
													this.setState({
														length: e.target.value,
													})
												}
												value={this.state.length}
												name="description"
												required
												addon
											/>
											<InputGroupText>in</InputGroupText>
										</InputGroup>
									</FormGroup>
								</Col>
							</Row>
						</ModalBody>
						<ModalFooter>
							<Button
								id="create-button"
								className="editProfile-button"
								type="submit"
							>
								Update Catch
							</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default EditFish;
