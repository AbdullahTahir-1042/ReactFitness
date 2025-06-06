# README

ReactFit
A fitness dashboard application that integrates with Fitbit to display user's fitness data.

## Tasks Done

* Fitbit OAuth2 authentication
* Dashboard with fitness statistics
* Lifetime stats display
* Badges showcase
* Steps and distance charts
* Friends list with step counts
* Demo mode for non-authenticated users

# Tech Stack

* Ruby on Rails
* PostgreSQL
* Chart.js
* React
* Fitbit API

# Setup

## Clone the repository:

     git clone https://github.com/AbdullahTahir-1042/ReactFitness
     cd reactfit

## Install dependencies:

     bundle install
     yarn install

## Set up the database:

     rails db:create
    rails db:migrate

## Create a .env file with your Fitbit API credentials:

     FITBIT_CLIENT_ID=your_client_id
     FITBIT_CLIENT_SECRET=your_client_secret

## Start the server:

     rails server
    Visit http://localhost:3000 in your browser




# ❌ Remaining Tasks

## Partial Pending

* Token exchange and secure storage of access tokens are still pending implementation. This is crucial for managing Fitbit API access securely.

# Enhancements and Finalization 

* Data Visualization Improvements 

* Additional visual representations need to be implemented.

## Interface and Experience Enhancements 

* Polishing the layout for better responsiveness across devices.

* Optimizing usability and accessibility.

## Final Testing and Debugging 

* Comprehensive system-wide testing.

* Fixing bugs found during integration or UX testing.



License

This project is licensed under the MIT License - see the LICENSE file for details.this contains completed task 
