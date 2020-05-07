import { Component } from '/lib/preact.js';
import { getUser } from '/app/model/Users.js';

class User extends Component {
    state = {
        user : null
    };

    styleUser = {
        display: 'flex'
    }

    styleName = {

    }

    styleImage = {
        width: '24px',
        height: '24px',
        marginRight: '8px',
        borderRadius: '32px',
    }

    constructor(id) {
        super();
        this.state = {};
        this.userId = id;
        this.userBody = "Loading...";
    }

    componentDidMount() {
        getUser(this.props.userId, user => this.setState({ user }));
    }

    render() {
        if (this.state.user === undefined)
        {
            return html`
            <div style=${this.styleUser}>
                <div class="user-name">
                    Loading...
                </div>
            </div>`;
        }
        else
        {
            return html`
            <div style=${this.styleUser}>
                <div>
                    <img  style=${this.styleImage} src="${this.state.user.profilePic}"/>
                </div>
                <div class="user-name">
                    ${this.state.user.userName}
                </div>
            </div>`;
        }

    }
}

export { User as default };
