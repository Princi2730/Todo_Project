# TODO list

* This project is created using javascript library/Framework in frontend React with Redux Toolkit and nodeJs with expressJs for backend

CRUD OPERATION :
1. Add and Manage Users
2. Todo (Users should be able to do the following):
a. Create: Ability to add new tasks.
b. Read: Display a list of tasks.
c. Update: Edit existing tasks.
d. Delete: Remove tasks.

## Installation

1. Clone the repository.
2. Install dependencies with `npm install` in both frontend and backend.
3. Set up environment variables in backend .env file.
4. Start the server in backend  with `npm start`.
5. Start the frontend  with `npm start`.


## Endpoints

- `/api/user`
  - `POST`: Create a new user.

- `/api/login`
  -`POST`:Login user

- `/api/tasks`
  -`POST`:create new task

  - `/api/tasks/:userId`
  -`GET`:Fetch all tasks of a single user

  - `/api/tasks/:taskId`
  -`PUT`:Update the task 

- `/api/tasks/:taskId`
  - `DELETE`: Delete a specific Task by ID.

## Database

This project uses MySQL as its database. Make sure to set up the database and configure the connection string.

## Environment Variables

PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=todo_app
JWT_SECRET=todo_app_demo


