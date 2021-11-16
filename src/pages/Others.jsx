import React, { Component } from "react";
import {
	Row,
	Col,
	CardGroup,
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Button,
} from "reactstrap";
import AdminDeleteUser from "../functionality/AdminDeleteUser";
import "./Other.css";

class Others extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.fetchUsers();
	}

	render() {
		console.log(this.props.user);
		console.log("USERS ARE ABOVE^^^");

		return (
			<div className="userWrapper">
				{!!this.props.users &&
					this.props?.users
						.filter(
							(u) =>
								this.props.user.city === u.city &&
								this.props.user.state === u.state &&
								this.props.user.id !== u.id
						)
						?.sort((a, b) => {
							return (
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime()
							);
						})
						?.map((user, index) => {
							const createdAt = new Date(user.createdAt);
							const createdDate = createdAt.toLocaleDateString("en-US");
							const createdTime = createdAt.toLocaleTimeString([], {
								timeStyle: "short",
							});

							return (
								<Row key={index} className="g-4 userCards">
									<Card>
										<CardBody className="userCard">
											<div>
												<img
													src={
														user?.profileImage ??
														"https://camo.githubusercontent.com/c6fe2c13c27fe87ac6581b9fe289d2f071bd1b4ef6f3e3c5fc2aba0bbc23fd88/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37632f50726f66696c655f6176617461725f706c616365686f6c6465725f6c617267652e706e67"
													}
													alt="profileImage"
													className="app-logo"
												/>
											</div>
											<div className="userName">{user?.userName}</div>
											<div className="catchCount">
												<span className="catchTitle">Catches:</span>{" "}
												{user?.fishes.length}
											</div>
											<div className="message">
												<div>
													<a href={"mailto:" + user?.email}>
														<Button className="editProfile-button">
															Message
														</Button>
													</a>
												</div>
												<div
													style={{
														display:
															this.props.user.admin === true ? "auto" : "none",
														marginLeft: "10px",
													}}
												>
													<AdminDeleteUser
														user={user}
														sessionToken={this.props.sessionToken}
														updateUsers={this.props.updateUsers}
													/>
												</div>
											</div>
										</CardBody>
									</Card>
								</Row>
							);
						})}
			</div>
		);
	}
}

export default Others;
