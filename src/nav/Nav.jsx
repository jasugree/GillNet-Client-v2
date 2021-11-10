import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import BrandLogo from '../assets/GillNet-light.svg'
import Home from '../pages/Home'
import Nearby from '../pages/Nearby'
import Others from '../pages/Others'
import Profile from '../pages/Profile'
import FishCreate from '../functionality/FishCreate';
import './nav.css'


class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { fishes: [],dropdownOpen: false}

        
    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

//GET ALL FISH 
    fetchPost = () => {
        let token = localStorage.getItem("token") 
        fetch("http://localhost:3000/fish/",{
          method: "GET",
          headers: new Headers ({
            "Content-Type": "application/json",
            Authorization: token,
        }),
        })
        .then((res) => res.json())
          .then((feedData) => {
            console.log(feedData);
            this.setState({fishes: feedData})
          })
          .catch((error) => {
            console.log("Error", error);
            alert("Something went wrong. Please try again.")
            return
          });
    }  

    updateFishes = (fish, update=false) =>{
        if (update){
            this.setState({fishes: [...this.state.fishes.filter(f => f.id !== fish.id), fish] })
            this.fetchPost();
        }else{
        this.setState({fishes: [...this.state.fishes, fish] })}
    }


    componentDidMount() {
        this.fetchPost();
      }


    render() { 

        const userName = localStorage.getItem("userName");
        console.log(userName)
        const profileImage = localStorage.getItem("profileImage");
        console.log(typeof profileImage)
        console.log("RIGHT HERE^^^ ")
        return (
            <div className="fullNav">
            <div className="navWrapper">
                <div className="mainMenu">
                    <div className="appBranding">
                        <img
                        src={BrandLogo}
                        alt="Brand Logo"
                        className="app-logo"
                        />
                    </div>
                    <ul className="navMenu">
                    <Link to="/home">
                        <li className="navItem"><i class="fas fa-home"></i>Home</li>
                    </Link>
                    <Link to="/nearby">
                        <li className="navItem"><i class="far fa-compass"></i>Catches Nearby</li>
                    </Link>
                    <FishCreate sessionToken={this.props.sessionToken} updateFishes={this.updateFishes}/>
                    <Link to="/others">
                        <li className="navItem"><i class="fas fa-users"></i>Others In Your Area</li>
                    </Link>
                    <Link to="/profile">
                        <li className="navItem"><i class="fas fa-user"></i>My Profile</li>
                    </Link>
                    <Link to="/" onClick={this.props.clearToken}>
                    <li className="navItem"><i class="fas fa-sign-out-alt"></i>Logout</li>
                    </Link>
                    </ul>
                </div>
                <div className="footer">
                    <p className="copyright">COPYRIGHT © 2021 JAKE GREENE. ALL RIGHTS RESERVED.</p>
                    <ul className="footerMenu">
                        <li className="footerItem"><i class="fas fa-user-plus"></i>Invite a friend!</li>
                        <li className="footerItem"><i class="fas fa-question-circle"></i>Need Help?</li>
                    </ul>
                </div>
            </div>
            <div className="greeting">
                <p>Good Morning, {userName}</p>
                <div className="profileImage">


                <div className="editProfile"><i class="fas fa-ellipsis-h"></i></div>
                        <img
                        src={profileImage == "null" ? "https://camo.githubusercontent.com/c6fe2c13c27fe87ac6581b9fe289d2f071bd1b4ef6f3e3c5fc2aba0bbc23fd88/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37632f50726f66696c655f6176617461725f706c616365686f6c6465725f6c617267652e706e67" : profileImage }
                        alt="profileImage"
                        className="app-logo"
                        />
                    </div>
            </div>
            
            <div className="pageContent">
                    <Route exact path="/home">
                        <Home fishes={this.state.fishes} sessionToken={this.props.sessionToken} updateFishes={this.updateFishes}/>
                    </Route>
                    <Route exact path="/nearby">
                        <Nearby/>
                    </Route>
                    <Route exact path="/others">
                        <Others/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile/>
                    </Route>
            </div>


            
            </div> 
         );
    }
}
 
export default Nav;