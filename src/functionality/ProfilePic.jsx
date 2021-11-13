import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import PlaceholderImage from "../placeholder-post.jpg";
import "./EditProfile.css";

const ProfilePic = (props) => {
	const { setImage, image } = props;
	const [loading, setLoading] = useState(false);

	const UploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "Jake-test");
		setLoading(true);
		const res = await fetch(
			"https://api.cloudinary.com/v1_1/jgreene/image/upload",
			{
				method: "POST",
				body: data,
			}
		);
		const File = await res.json();

		setImage(File.secure_url);
		setLoading(false);
	};

	return (
		<div className="profile-pic">
			<img
				style={{ width: "100%" }}
				id="profile-pic"
				src={props.image === "" ? PlaceholderImage : props.image}
				alt=""
			/>
			<FormGroup id="uploader">
				<label for="profile-image-upload" className="custom-file-upload">
					<input
						id="profile-image-upload"
						type="file"
						name="file"
						placeholder="Upload Image Here"
						onChange={UploadImage}
					/>{" "}
					<i class="fas fa-plus"></i>{" "}
				</label>
				{loading ? <h4>Loading...</h4> : null}
			</FormGroup>
		</div>
	);
};

export default ProfilePic;
