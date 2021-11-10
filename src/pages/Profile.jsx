import React, { Component } from 'react';
import { Row, Col, CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button} from "reactstrap";
import './profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Row className="profileHeader" style={{maxWidth: "1000px"}}>
                <Col >
                <div className="profileCard" >
                    <div className="topHalf">
                        <img className="ProfileprofileImage" src="https://camo.githubusercontent.com/c6fe2c13c27fe87ac6581b9fe289d2f071bd1b4ef6f3e3c5fc2aba0bbc23fd88/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37632f50726f66696c655f6176617461725f706c616365686f6c6465725f6c617267652e706e67" alt="" />
                        <h1>Jake Greene</h1>
                    </div>
                    <div className="bottomHalf">
                        <div className="details">
                            <div className="join">
                            I Joined Today
                            </div>
                            <div className="otherDets">
                            <span>City:</span><span>Westfield</span>
                            <hr />
                            <span>State:</span><span>IN</span>
                            </div>
                        </div>
                    <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>  
                    </div>
                    
                </div>
                </Col>
                </Row>
                <Row style={{maxWidth: "1000px",margin: "auto"}}>
                <Col>
                <div className="myFish" >
                    Recent Catches                   
                </div>
                </Col>
                <Col>
                <div className="myFish" >
                    Jake's Gear                    
                </div>
                </Col>
                </Row>
            </div>
         );
    }
}
 
export default Profile;