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
import FishPic from "./FishPic";

class FishCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			fishImage: "",
			species: "",
			weight: 0,
			length: 0,
			catchAndRelease: false,
			caption: "",
		};
	}

	handleFishCatch = (e) => {
		e.preventDefault();
		fetch("http://localhost:3000/fish/create", {
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
				this.props.updateFishes(data);
				window.location.reload();
			});
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	setImage = (url) => {
		this.setState({
			fishImage: url,
		});
	};

	render() {
		return (
			<div>
				<li className="navItem" onClick={this.toggle}>
					<i className="fas fa-fish"></i>
					<br />
					<span>Log a Catch</span>
				</li>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<Form onSubmit={this.handleFishCatch}>
						<ModalHeader toggle={this.toggle}>Log Your Catch</ModalHeader>
						<ModalBody className="create-modal">
							<FormGroup>
								<FishPic
									image={this.state.fishImage}
									setImage={this.setImage}
								/>
							</FormGroup>
							<FormGroup>
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
									<FormGroup>
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
							<Button id="create-button" type="submit">
								Post
							</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default FishCreate;
