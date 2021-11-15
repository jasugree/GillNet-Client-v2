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
import "./profile.css";
import EditFish from "../functionality/EditFish";
import DeleteFish from "../functionality/DeleteFish";
import LikeFish from "../functionality/LikeFish";
import DeleteGear from "../functionality/DeleteGear";
import EditGear from "../functionality/EditGear";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.fetchMyGear();
		this.props.fetchPost();
	}

	render() {
		const profileImage = localStorage.getItem("profileImage");
		const firstName = localStorage.getItem("firstName");
		const lastName = localStorage.getItem("lastName");

		const createdAt = new Date(this.props.user?.createdAt);
		const createdDate = createdAt.toLocaleDateString("en-US");
		const createdTime = createdAt.toLocaleTimeString([], {
			timeStyle: "short",
		});

		return (
			<div>
				<Row className="profileHeader" style={{ maxWidth: "1000px" }}>
					<div className="profileCard">
						<div className="topHalf">
							<img
								className="ProfileprofileImage"
								src={
									this.props.user?.profileImage ??
									"https://camo.githubusercontent.com/c6fe2c13c27fe87ac6581b9fe289d2f071bd1b4ef6f3e3c5fc2aba0bbc23fd88/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37632f50726f66696c655f6176617461725f706c616365686f6c6465725f6c617267652e706e67"
								}
								alt=""
							/>
							<h1>
								{this.props.user?.firstName} {this.props.user?.lastName}
							</h1>
						</div>
						<div className="bottomHalf">
							<div className="details">
								<div className="join">
									{this.props.user?.userName} joined on {createdDate}
								</div>
								<div className="otherDets">
									<span className="title">City: </span>
									<span>{this.props.user?.city}</span>
									<hr className="detailBreak" />
									<span className="title">State: </span>
									<span>{this.props.user?.state}</span>
								</div>
							</div>
							<div className="description">{this.props.user?.description}</div>
						</div>
					</div>
				</Row>
				<Row
					xs={1}
					lg={2}
					className="userFishGear"
					style={{ maxWidth: "1000px", margin: "auto" }}
				>
					<Col>
						<div className="myFish">
							<h2>{this.props.user?.firstName}'s Recent Catches</h2>
							<Row lg={1} className="g-4 myFishCards">
								{this.props.fishes
									.filter((f) => this.props.user.id === f.userId)
									?.sort((a, b) => {
										return (
											new Date(b.createdAt).getTime() -
											new Date(a.createdAt).getTime()
										);
									})
									.slice(0, 3)
									.map((fish, index) => {
										const createdAt = new Date(fish.createdAt);
										const createdDate = createdAt.toLocaleDateString("en-US");
										const createdTime = createdAt.toLocaleTimeString([], {
											timeStyle: "short",
										});

										return (
											<Col key={index}>
												<Card>
													<CardImg
														variant="top"
														src={fish.fishImage}
														style={{
															height: "200px",
															objectFit: "cover",
															borderRadius: "none",
														}}
													/>
													<CardBody>
														<div className="interact">
															<div className="likeRelease">
																<span className="likes">
																	<LikeFish
																		fish={fish}
																		updateFishes={this.props.updateFishes}
																		sessionToken={this.props.sessionToken}
																	/>
																</span>
															</div>
															<div>
																<span
																	className="releaseTag"
																	style={{
																		display:
																			fish.catchAndRelease == true
																				? "auto"
																				: "none",
																	}}
																>
																	<i class="fas fa-check"></i>RELEASED!
																</span>
															</div>
															<div className="editDelete">
																<div className="editButton">
																	<EditFish
																		profile={true}
																		fish={fish}
																		updateFishes={this.props.updateFishes}
																		sessionToken={this.props.sessionToken}
																	/>
																</div>
																<div className="deleteButton">
																	<DeleteFish
																		profile={true}
																		fish={fish}
																		updateFishes={this.props.updateFishes}
																		sessionToken={this.props.sessionToken}
																	/>
																</div>
															</div>
														</div>
														<CardText>
															{fish.caption}
															<div className="cardDate">
																<span>{createdDate}</span>
															</div>
														</CardText>

														<div className="catchDetails">
															<Row>
																<div>
																	<dt className="species">Species</dt>
																	<dd className="species">{fish.species}</dd>
																</div>
																<div>
																	<dt className="weight">Weight</dt>
																	<dd className="weight">{fish.weight}lb</dd>
																</div>
															</Row>
															<Row>
																<div>
																	<dt className="time">Time of Day</dt>
																	<dd className="time">{createdTime}</dd>
																</div>
																<div>
																	<dt className="length">Length</dt>
																	<dd className="length">{fish.length}in</dd>
																</div>
															</Row>
														</div>
													</CardBody>
												</Card>
											</Col>
										);
									})}
							</Row>
						</div>
					</Col>
					<Col>
						<div className="myFish">
							<h2>{this.props.user?.firstName}'s Gear</h2>
							<Row lg={1} className="g-4 myFishCards">
								{this.props.gears
									?.sort((a, b) => {
										return (
											new Date(b.createdAt).getTime() -
											new Date(a.createdAt).getTime()
										);
									})
									.map((gear, index) => {
										const createdAt = new Date(gear.createdAt);
										const createdDate = createdAt.toLocaleDateString("en-US");
										const createdTime = createdAt.toLocaleTimeString([], {
											timeStyle: "short",
										});

										return (
											<Col key={index}>
												<Card>
													<CardBody className="gearCard">
														<div className="gearWrapper">
															<div className="gearHeader">
																<div className="header">
																	<span className="gearStart">
																		{gear?.gearType}:
																	</span>{" "}
																	{gear?.title}
																</div>
																<div className="interactiveGear">
																	{" "}
																	<div className="editButtonGear">
																		<EditGear
																			user={this.props.user}
																			gear={gear}
																			updateFishes={this.props.updateFishes}
																			sessionToken={this.props.sessionToken}
																			updateGears={this.props.updateGears}
																		/>
																	</div>
																	<div className="deleteButtonGear">
																		<DeleteGear
																			user={this.props.user}
																			gear={gear}
																			updateFishes={this.props.updateFishes}
																			sessionToken={this.props.sessionToken}
																			updateGears={this.props.updateGears}
																		/>
																	</div>
																</div>
															</div>
															<div className="gearDetails">
																<div>{gear?.brand}</div>
																<div>${gear?.price}.00</div>
															</div>
															<div className="gearReviewInteract">
																<div className="review">
																	<i class="fas fa-star"></i>
																	{gear?.userRating}/5
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</Col>
										);
									})}
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Profile;
