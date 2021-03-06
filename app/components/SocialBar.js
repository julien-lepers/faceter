import { Component } from "/lib/preact.js";
import { getUser } from '/app/model/Users.js';
import { getSessionId } from '/app/model/Session.js';
import * as Style from '/app/model/Style.js';
import {route} from "/lib/preact-router.js";

class SocialBar extends Component {

    state = {
        followed: [],
        follower: [],
    }

    styleFollow = {
        display: "flex",
        backgroundColor: "var(--theme-frontground)",
        borderRadius: "8px",
        padding: "16px 8px",
        marginBottom: "16px",
        overflow: "hidden"
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("/api/query-user-followed.php?sessionId=" + getSessionId() + "&followedId=" + this.props.userId)
            .then(function (response) {
                return response.json()
            })
            .then(isFollowed => {
                if (isFollowed)
                    this.setState({nameButton: "Fuir"});
                else
                    this.setState({nameButton: "Suivre"});
                this.createFollowButton()
                this.loadBar()
            });
    }

    loadBar() {
        getUser(this.props.userId, user => this.setState({ followed: user.followed.length, follower: user.followers.length }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
            this.loadBar();
        }
    }

    followUser() {
        let value = document.getElementById("followButton").textContent;
        if (value === "Fuir") {
            this.requestFollow(0);
            this.setState({nameButton: "Suivre"});
        }
        else {
            this.requestFollow(1);
            this.setState({nameButton: "Fuir"});
        }

    }

    requestFollow(isFollow) {
        fetch("/api/query-user-follow.php?follow=" + isFollow + "&sessionId=" + getSessionId() + "&user=" + this.props.userId)
            .then(function (response) {
                return response.json()
            })
            .then(value => {
                console.log(value);
            })
    }

    createFollowButton() {
        if (getSessionId() != this.props.userId) {
            return html`<button id="followButton" style=${Style.Button} onclick=${() => this.followUser()}>${this.state.nameButton}</button>`;
        }
    }

    render() {
        return html`
            <div style=${this.styleFollow}>
                ${this.createFollowButton()}
                <a href=${"/profile/" + this.props.userId + "/follow"}>
                    <span style=${Style.Link}>
                        ${this.state.followed} abonnements
                    </span>
                    <span style=${Style.Link}>
                        ${this.state.follower} abonnés
                    </span>
                </a>
            </div >
    `;
    }
}
export { SocialBar as default };