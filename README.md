# Task Manager

This is a simple task manager application built using Node.js, Express.js, JavaScript and MongoDB database. It allows users to signUp, and create, update, and delete tasks with a expire date. Users can also mark tasks as completed or incomplete, and sort them based on completed or pending.

## Features

* User signup and login.

* CRUD(Create, Read, Update and Delete) operations for tasks.

* Sorting based on completed or pending tasks.

* Configured caching to reduce the time to read data from the database, TTL for cache is 10 minutes.


### Technology Stack

* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

* ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone the repository:

```shell
git clone https://github.com/codeblooded1001000/task_manager.git
```
2. Install dependencies:

```shell
npm install
```

3. Start the application:
```shell
npm run dev
```
If this doesn't work out then run this command in the src directory.
```shell
npx nodemon app.js
```

4. Access the API at `http://localhost:5000/`

## API Endpoints

#### Users Endpoints

`POST /users/signUp`: Register a user.

`POST /users/login`: Login a user.

#### Tasks endpoints

`POST /tasks/addNewTask`: Create a new task for the user, using the name of that user, by which he/she is logged in.

`GET /tasks/getAll`: Fetches all tasks.

`GET /tasks/getCompletedTasks`: Fetches all completed tasks of that particular user, who is logged in after authenticating.

`GET /tasks/getPendingTasks`: Fetches all pending tasks of that particular user, who is logged in after authenticating.

`GET /tasks/${id}`: Fetches that task which is associated with the id, in the parameter.

`PATCH /tasks/updateTask?taskId=${id}`: Updates that task which is associated with the id, in the query.

`DELETE /tasks/deleteTask?taskId=${id}`: Updates that task which is associated with the id, in the query.

# Documentation

Here are the detailed documentation for the API: [Task-Manager](https://documenter.getpostman.com/view/24360292/2s93CSpAtV)

# Demo

https://user-images.githubusercontent.com/110348583/222145527-3ffd4de8-cbee-46d5-b8ef-d592cc3f477c.mp4
