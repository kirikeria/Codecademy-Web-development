import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: null };
  }
  render() {
    const isLoading = this.state.userData === null ? true : false;
    const name = isLoading ? 'Loading...' : this.state.userData.name;
    const bio = isLoading ? 'Bio goes here...' : this.state.userData.bio;
    let className = 'Profile';
    if (this.state.userData === null) {
      className += ' loading';
    }

    return (
      <div className={className}>
        <div className="profile-picture"></div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={[]} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }

  loadUserData() {
    this.setState({ userData: null });
    this.fetchID = fetchUserData(this.props.username, (userData) => {
      this.setState({ userData });
    });
  }

  componentDidMount() {
    this.loadUserData();
  }
}