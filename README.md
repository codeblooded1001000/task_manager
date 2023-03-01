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

## Documentation

Here's the detailed documentation for the API: [Task-Manager](https://documenter.getpostman.com/view/24360292/2s93CSpAtV)

## API Endpoints

#### Users Endpoints

```shell
POST /users/signUp
```
Description: Register a user.

Body:

```shell
{
    "name": "Pushpander Singh Tanwar",
    "email": "test@sample.com",
    "password": "helloworld",
    "mobile": 701001010
}
```
Response:
```shell
{
    "success": true,
    "data": {
        "userId": "63ff4a67b0e282c7768d71f2",
        "email": "sample@wxample.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZmNGE2N2IwZTI4MmM3NzY4ZDcxZjIiLCJlbWFpbCI6InNhbXBsZUB3eGFtcGxlLmNvbSIsImlhdCI6MTY3NzY3NTExMX0.1vH-r9YUcpUyOfenTcpb3c9vgGBrYpvHnS4mZeLnVlI",
        "createdAt": "2023-03-01T12:51:51.976Z"
    }
}
```

***


```shell
POST /users/login
```
Description: Login a user.

Body:

```shell
{
    "email": "test@sample.com",
    "password": "helloworld",
}
```
Response:
```shell
{
    "success": true,
    "data": {
        "status": 200,
        "message": "User login successful",
        "userId": "63ff4a67b0e282c7768d71f2",
        "email": "test@sample.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZmNGE2N2IwZTI4MmM3NzY4ZDcxZjIiLCJlbWFpbCI6InNhbXBsZUB3eGFtcGxlLmNvbSIsImlhdCI6MTY3NzY3NTE0MH0.vsNrai_NZQQVa3Xma_z2WNnjIvoy1gPcxYVZAo146M8"
    }
}
```

#### Tasks endpoints

```shell
POST /tasks/addNewTask
```
Description: Create a new task for the user, using the name of that user, by which he/she is logged in.

Body:

```shell
{
    "name": "Some task1",
    "description": "Some desc1",
    "expireOn": "2023-03-02"
}
```
Response:
```shell
{
    "status": 201,
    "message": "New Task created",
    "data": {
        "name": "Some task1",
        "description": "Some desc1",
        "expireOn": "2023-03-02T00:00:00.000Z",
        "completed": false,
        "_id": "63ff4a9bb0e282c7768d71f8",
        "assignee": "Sample abc",
        "createdAt": "2023-03-01T12:52:43.632Z"
    }
}
```

***

```shell
GET /tasks/getAll
```
Description: Fetches all tasks of that particular user, who is logged in after authenticating.

Response:
```shell
{
    "status": 200,
    "message": "All tasks",
    "data": [
        {
            "_id": "63ff4a8eb0e282c7768d71f5",
            "name": "Some task6",
            "description": "Some desc6",
            "expireOn": "2023-03-04T00:00:00.000Z",
            "completed": false,
            "assignee": "Sample abc",
            "createdAt": "2023-03-01T12:52:31.125Z"
        },
        {
            "_id": "63ff4a9bb0e282c7768d71f8",
            "name": "Some task7",
            "description": "Some desc7",
            "expireOn": "2023-03-04T00:00:00.000Z",
            "completed": true,
            "assignee": "Sample abc",
            "createdAt": "2023-03-01T12:52:43.632Z"
        }
    ]
}
```

***


```shell
GET /tasks/getCompletedTasks
```
Description: Fetches all completed tasks of that particular user, who is logged in after authenticating.

Response:
```shell
{
    "status": 200,
    "message": "All Completed tasks",
    "data": [
        {
            "_id": "63ff4a9bb0e282c7768d71f8",
            "name": "Some task7",
            "description": "Some desc7",
            "expireOn": "2023-03-04T00:00:00.000Z",
            "completed": true,
            "assignee": "Sample abc",
            "createdAt": "2023-03-01T12:52:43.632Z"
        }
    ]
}
```

***


```shell
GET /tasks/getPendingTasks
```
Description: Fetches all pending tasks of that particular user, who is logged in after authenticating.

Response:
```shell
{
    "status": 200,
    "message": "All pending tasks",
    "data": [
        {
            "_id": "63ff4a8eb0e282c7768d71f5",
            "name": "Some task6",
            "description": "Some desc6",
            "expireOn": "2023-03-04T00:00:00.000Z",
            "completed": false,
            "assignee": "Sample abc",
            "createdAt": "2023-03-01T12:52:31.125Z"
        }
    ]
}
```
***


```shell
GET /tasks/${id}
```
Description: Fetches that task which is associated with the id, in the parameter.

Response:
```shell
{
    "status": 200,
    "data": [
        {
            "_id": "63ff4a9bb0e282c7768d71f8",
            "name": "Some task7",
            "description": "Some desc7",
            "expireOn": "2023-03-04T00:00:00.000Z",
            "completed": true,
            "assignee": "Sample abc",
            "createdAt": "2023-03-01T12:52:43.632Z"
        }
    ]
}
```
***

```shell
PATCH /tasks/updateTask?taskId=${id}
```
Description: Updates that task which is associated with the id, in the query.

Body:
```shell
{
   "completed": true
}
```

Response:
```shell
{
    "status": 200,
    "message": "task updated",
    "data": [
        {
            "_id": "63ff4a9bb0e282c7768d71f8",
            "name": "Some task7",
            "description": "Some desc7",
            "expireOn": "2023-03-04T00:00:00.000Z",
            "completed": true,
            "assignee": "Sample abc",
            "createdAt": "2023-03-01T12:52:43.632Z"
        }
    ]
}
```
***

```shell
DELETE /tasks/deleteTask?taskId=${id}
```
Description: Updates that task which is associated with the id, in the query.

Response:
```shell
{
    "status": 200,
    "message": "task deleted"
}
```

# Demo

https://user-images.githubusercontent.com/110348583/222145527-3ffd4de8-cbee-46d5-b8ef-d592cc3f477c.mp4
