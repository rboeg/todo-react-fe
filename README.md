## Table of contents
* [General info](#general-info)
* [Prerequisites](#prerequisites)
* [Setup](#setup)

## General info
To-do Web application React JS frontend.

![todo-react-fe](https://github.com/rboeg/todo-react-fe/blob/main/blob/fe.gif?raw=true)

Backend application available in [https://github.com/rboeg/todo-spring-boot-be](https://github.com/rboeg/todo-spring-boot-be)


## Prerequisites
* Node.js >= 12.20.7
* TypeScript >= 4.2.4
* React >= 17.0.3
* Axios >= 0.21.1
* Bootstrap >= 4.6.0

## Setup
Clone down this repository. You will need **node** and **npm** installed globally on your machine.  

Create an `.env` file locally. You can duplicate `.env.example` and name the new copy `.env`. Adapt the variables to your needs.

Installation:

`npm install`  

To start the development server:

`npm start`  

To build for production:

`npm run build`

For environments using Node, the easiest way to run builds is using **serve** (`npm install -g serve`) and let it handle the rest:

`serve -s build`
