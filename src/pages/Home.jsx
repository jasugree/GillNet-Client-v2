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
import "./Home.css";
import EditFish from "../functionality/EditFish";
import DeleteFish from "../functionality/DeleteFish";
import LikeFish from "../functionality/LikeFish";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Row xs={1} lg={2} xl={3} xxl={4} className="g-4 fishCards">
					{!!this.props.fishes &&
						this.props?.fishes
							?.sort((a, b) => {
								return (
									new Date(b.createdAt).getTime() -
									new Date(a.createdAt).getTime()
								);
							})
							?.map((fish, index) => {
								const createdAt = new Date(fish.createdAt);
								const createdDate = createdAt.toLocaleDateString("en-US");
								const createdTime = createdAt.toLocaleTimeString([], {
									timeStyle: "short",
								});

								return (
									<Col key={index}>
										<Card>
											<div className="profileDetails">
												<div className="postProfileImage">
													<img
														src={
															fish?.user?.profileImage === null
																? "https://camo.githubusercontent.com/c6fe2c13c27fe87ac6581b9fe289d2f071bd1b4ef6f3e3c5fc2aba0bbc23fd88/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37632f50726f66696c655f6176617461725f706c616365686f6c6465725f6c617267652e706e67"
																: fish?.user?.profileImage
														}
														alt="user_profileImage"
														className="profileImage"
														style={{ objectFit: "cover" }}
													/>
												</div>
												<div className="userName">{fish?.user?.userName}</div>
											</div>
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
																user={this.props.user}
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
																user={this.props.user}
																fish={fish}
																updateFishes={this.props.updateFishes}
																sessionToken={this.props.sessionToken}
															/>
														</div>
														<div className="deleteButton">
															<DeleteFish
																user={this.props.user}
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
		);
	}
}

export default Home;
