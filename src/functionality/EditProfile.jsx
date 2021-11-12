import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, FormFeedback, FormText, FormGroup, Input, Row, Col, InputGroupText,InputGroup} from 'reactstrap';
import '../nav/nav.css'
import ProfilePic from './ProfilePic';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, profileImage: "", firstName: "", lastName: "", email: "", description: "", age: 0, city: "", state: "", admin: false }
    }

    handleUpdateProfile = (e) => {
        fetch("http://localhost:3000/user/updateprofile", {
            method: "PUT",
            body: JSON.stringify(this.state),
            headers: new Headers ({
                "Content-Type": "application/json",
            Authorization: this.props.sessionToken
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.toggle();
            this.props.updateUser(this.state);
            // window.location.reload(); 
        })
    }
    
    
    
        toggle = () =>{
            this.setState({
                modal: !this.state.modal
            })
        }
    
        setImage = (url) =>{
            this.setState({
                profileImage: url
            })
        }


    render() { 
        return ( 
            <div>
                <div className="editProfile" onClick={this.toggle}>
                    <i class="fas fa-ellipsis-h"></i>
                </div>

                <Modal style={{maxWidth:"800px"}} isOpen={this.state.modal} toggle={this.toggle}>
      <Form onSubmit={this.handleUpdateProfile}>
        <ModalHeader toggle={this.toggle}>Update Your Profile</ModalHeader>
        <ModalBody className="create-modal">
            <FormGroup>
              <ProfilePic image={this.state.profileImage} setImage={this.setImage}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">First Name</Label>
              <Input
                type="textarea"
                rows="1"
                placeholder="Please enter your first name"
                name="description"
                onChange={(e) => this.setState({
                    firstName: e.target.value
                })}
                value={this.state.firstName}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Last Name</Label>
              <Input
                type="textarea"
                rows="1"
                placeholder="Please enter your last name"
                name="description"
                onChange={(e) => this.setState({
                    lastName: e.target.value
                })}
                value={this.state.lastName}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Email</Label>
              <Input
                type="textarea"
                rows="1"
                placeholder="Brown Trout, Catfish..."
                name="description"
                onChange={(e) => this.setState({
                    email: e.target.value
                })}
                value={this.state.email}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input
                type="textarea"
                rows="1"
                placeholder="Brown Trout, Catfish..."
                name="description"
                onChange={(e) => this.setState({
                    description: e.target.value
                })}
                value={this.state.description}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Age</Label>
              <Input
                type="textarea"
                rows="1"
                placeholder="Brown Trout, Catfish..."
                name="description"
                onChange={(e) => this.setState({
                    age: e.target.value
                })}
                value={this.state.age}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">City</Label>
              <Input
                type="textarea"
                rows="1"
                placeholder="Brown Trout, Catfish..."
                name="description"
                onChange={(e) => this.setState({
                    city: e.target.value
                })}
                value={this.state.city}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">State</Label>
              <Input
                type="textarea"
                rows="1"
                placeholder="Brown Trout, Catfish..."
                name="description"
                onChange={(e) => this.setState({
                    state: e.target.value
                })}
                value={this.state.state}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Admin</Label>
              <br/>
              <Input
                type="checkbox"
                rows="1"
                onChange={() => this.setState({
                    admin: !this.state.admin
                })}
                value={this.state.admin}
                name="description"
              />
            </FormGroup>
        </ModalBody>
        <ModalFooter>
        <Button id="create-button"
              type="submit" 
            >
              Post
            </Button>
        </ModalFooter>
        </Form>
      </Modal>


            </div> );
    }
}
 
export default EditProfile;