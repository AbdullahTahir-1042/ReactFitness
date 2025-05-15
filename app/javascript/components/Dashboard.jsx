import React, { Component } from 'react';
import LifetimeStats from './LifetimeStats.jsx';
import Badges from './Badges.jsx';
import dummyData from './dummyData.js';
import TimeSeriesBarChart from './TimeSeriesBarChart.jsx';
import Friends from './Friends.jsx';

const CLIENT_ID = '23QBFN';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = dummyData;
	}

	fetchFitbitData(url, fitbitToken, stateKey) {
		fetch(url, {
			method: 'GET',
			headers: { 'Authorization': 'Bearer ' + fitbitToken }
		})
			.then(response => response.json())
			.then(data => {
				console.log(`Data fetched for ${stateKey}:`, data);
				this.setState({ [stateKey]: data });
			})
			.catch(error => {
				console.log(`Error fetching data for ${stateKey}:`, error);
			});
	}

	componentDidMount() {
		fetch('/api/profile')
		  .then(response => response.json())
		  .then(data => {
			this.setState({
			  user: { user: { displayName: data.display_name } },
			  loggedIn: true
			});
		  });
	  
		fetch('/api/steps')
		  .then(response => response.json())
		  .then(data => {
			this.setState({ steps: data });
		  });
	  
		fetch('/api/badges')
		  .then(response => response.json())
		  .then(data => {
			this.setState({ badges: data });
		  });
	  
		fetch('/api/lifetime_stats')
		  .then(response => response.json())
		  .then(data => {
			this.setState({ lifetimeStats: data });
		  });
	  
		fetch('/api/distance')
		  .then(response => response.json())
		  .then(data => {
			this.setState({ distance: data });
		  });
	  
		fetch('/api/friends')
		  .then(response => response.json())
		  .then(data => {
			this.setState({ friends: data });
		  });
	  }
	  

	render() {
		return (
			<div className="container">
				<header className="text-center">
					<span className="pull-right">
						{this.state.user?.user?.displayName || ''}
					</span>
					<h1 className="page-header">React Fit</h1>
					<p className="lead">Your personal fitness dashboard</p>
				</header>

				{!this.state.loggedIn && (
					<div className="row text-center">
						<a href={`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=activity%20nutrition%20heartrate%20location%20profile%20settings%20sleep%20social%20weight&expires_in=604800`}>
							Connect with Fitbit
						</a>
					</div>
				)}

				<div className="row">
					<div className="col-lg-3">
						<LifetimeStats lifetimeStats={this.state.lifetimeStats} />
						<Badges badges={this.state.badges?.badges || []} />
					</div>

					<div className="col-lg-6">
						<TimeSeriesBarChart
							data={this.state.steps?.["activities-steps"] || []}
							title="Steps"
							yMax={8000}
						/>
						<TimeSeriesBarChart
							data={this.state.distance?.["activities-distance"] || []}
							title="Distance (miles)"
							yMax={6}
						/>
					</div>

					<div className="col-lg-2 col-lg-offset-1">
						<Friends friends={this.state.friends?.friends || []} />
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;