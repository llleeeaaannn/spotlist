# Spotlist
> A Progressive Web Application which transforms concert setlists into Spotify Playlists.
> You can find it at [Spotlist.net](https://www.spotlist.net)

## Table of Contents
* [General Information](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Usage](#usage)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)


## General Information
- Spotlist is a full stack application which creates playlists in a user's Spotify account from a setlist.fm setlist.
- Spotlist's frontend is built in Javascript on the React framework.
- Spotlist's backend is a Node.js server built on the Express framework, hosted on an AWS EC2 instance and accessed through AWS's API Gateway. The server persists through the use of Screen, a Linux terminal multiplexer. The backend can be found at the following [repository.](https://github.com/llleeeaaannn/spotlistAPI)
- The purpose of Spotlist is to allow concert goers, in 3 clicks, to effortlessly create a playlist in their Spotify account with every song from the setlist of their choice.


## Technologies Used
- React
- Javascript
- Service Workers
- HTML
- CSS
- CSS Modules
- Screen


## Features
Spotlist provides the following features:
- The ability to create a playlist, comprising of all the songs from a chosen setlist, in the user's Spotify account from a [setlist.fm](https://www.setlist.fm/) link.
- Spotlist also provides the user with the name (and associated artist) of all songs that were not available on Spotify.
- The application is lightweight and designed as a progressive web app whereby users can take advantage of modern web technologies including background sync, notifications, offline mode...
- Spotlist creates and assigns a custom name and description for the playlist based upon data parsed from the setlist while also allowing user's to input their own name and description if desired.


## User Interface


## Usage
The application is available at [Spotlist.net](https://www.spotlist.net)


## Room for Improvement
To do:
- Dark Mode


## Contact
Created by [Frank Pierce](https://www.frankpierce.me/) - feel free to contact me!
