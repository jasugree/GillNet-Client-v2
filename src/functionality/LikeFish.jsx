import React, { Component } from "react";
import APIURL from "../helpers/environments";
class LikeFish extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	toggleLike = () => {
		fetch(`${APIURL}/fish/like/${this.props.fish.id}`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.props.sessionToken,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				this.props.updateFishes(data, true);
				// window.location.reload();
			})
			.catch((error) => {
				alert("Something went wrong. Please try again.LIKING");
				return;
			});
	};

	render() {
		const userid = localStorage.getItem("userid");

		return (
			<div>
				<span className="editButton" onClick={this.toggleLike}>
					<i
						className={"fas fa-thumbs-up"}
						style={{
							opacity: this.props.fish?.likes?.includes(
								parseInt(this.props.user?.id)
							)
								? "1"
								: ".25",
						}}
					></i>
					{this.props.fish?.likes?.length}
				</span>
			</div>
		);
	}
}

export default LikeFish;

// {{className: this.props.fish?.likes.includes(userid) ? "fas fa-thumbs-up" : "far fa-thumbs-up" }}
