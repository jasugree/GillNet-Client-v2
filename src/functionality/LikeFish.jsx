import React, { Component } from 'react';
class LikeFish extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    toggleLike = () => {
        fetch(`http://localhost:3000/fish/like/${this.props.fish.id}`, {
            method: "POST",
            headers: new Headers ({
                "Content-Type": "application/json",
            Authorization: this.props.sessionToken
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data) 
            this.props.updateFishes(data, true);
            // window.location.reload();

            
        })
        .catch((error) => {
            console.log("Error", error);
            alert("Something went wrong. Please try again.")
            return
          });

    }


    render() { 
        console.log('LOOK AT FISHY!!!')
        console.log(this.props.fish.likes)
        const userid = localStorage.getItem("userid");

        return ( 
            <div>
            <span className="editButton" onClick={this.toggleLike}><i className={ this.props.fish?.likes?.includes(parseInt(userid)) ? "fas fa-thumbs-up" : "far fa-thumbs-up"} ></i>{this.props.fish?.likes?.length}</span>
            </div>
         );
    }
}
 
export default LikeFish;



// {{className: this.props.fish?.likes.includes(userid) ? "fas fa-thumbs-up" : "far fa-thumbs-up" }}