# Student Management System

# 1st mode: Running the Application Locally in development with Local Client & Server

This guide explains how to run only the database in Docker while running the client and server locally on your host machine.

## Step 1: Start the Database in Docker

```bash
# From the project root directory
docker compose -f docker-compose-db-only.yml up
```

This will start only the MySQL database in a Docker container, exposing port 3306 to your local machine. The database will be initialized with the scripts in the `init-db` directory.

## Step 2: Start the Server

Open a new terminal window and navigate to the server directory:

```bash
cd server

# Install dependencies (first time only)
npm install

# Start the server in development mode
npm run dev
```

The server will start on http://localhost:5002.

## Step 3: Start the Client

Open another terminal window and navigate to the client directory:

```bash
cd client

# Install dependencies (first time only)
npm install

# Start the React development server
npm start
```

The client will start on http://localhost:5173 and automatically open in your browser.

## Configuration

### Database Connection

The server connects to the database using the configuration in the `.env` file in the server directory. The default configuration is:

* Host: localhost
* Port: 3306
* User: student_user
* Password: student_password
* Database: student_management

### API Connection

The client connects to the server API using the URL specified in the `.env` file in the client directory. The default URL is http://localhost:5000/api.

## Stopping the Application

1. To stop the client and server, press `Ctrl+C` in their respective terminal windows.
2. To stop the database container, press `Ctrl+C` in the terminal window where you started the container, or run:
   ```bash
   docker compose -f docker-compose-db-only.yml down
   ```

## Troubleshooting

If you have issues connecting to the database, check that:

1. The database container is running (use `docker ps` to check)
2. The port 3306 is exposed and not in use by another process
3. The connection settings in the server's `.env` file match the database configuration

If you have issues with the API connection, check that:

1. The server is running and accessible at http://localhost:5000
2. The API URL in the client's `.env` file is correct

A full-stack application for managing students and homework assignments.

## Project Overview

This application demonstrates a complete full-stack application with:

1. **React Frontend** : A responsive React application with React Router for navigation
2. **Node.js Backend** : An Express.js server with RESTful API endpoints
3. **MySQL Database** : Database for storing students and homework information
4. **Docker Setup** : Docker Compose configuration to orchestrate all services

## Project Structure

```
student-management-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components for each route
│   │   ├── App.js          # Main app component with routing
│   │   ├── index.js        # Entry point
│   │   └── api.js          # API client for making server requests
│   ├── package.json
│   └── Dockerfile
├── server/                 # Node.js backend
│   ├── routes/             # API route handlers
│   ├── index.js            # Server entry point
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml      # Docker configuration
└── init-db/                # Database initialization scripts
    └── init.sql            # SQL script to initialize the database
```

## Features

* View a list of all students
* View details for individual students
* Track homework assignments
* View student progress on assignments
* Update homework completion status
* See completion statistics for assignments

## 2nd Mode: Running the Application with full Docker

1. **Prerequisites** :

* Docker and Docker Compose installed
* Node.js and npm installed (for development)

1. **Starting the Application** :

```bash
   # From the project root directory
   docker compose up
```

1. **Accessing the Application** :

* Frontend: http://localhost:5173
* Backend API: http://localhost:5002/api

## API Endpoints

* **GET /api/students** : Get all students
* **GET /api/students/:id** : Get a specific student
* **GET /api/homework** : Get all homework assignments
* **GET /api/homework/:id** : Get a specific homework assignment
* **GET /api/students/:id/homework** : Get all homework for a specific student
* **PUT /api/students/:studentId/homework/:homeworkId** : Update homework status for a student

## Development Notes

* The React frontend is configured to proxy API requests to the backend during development
* The database is initialized with sample data when the containers first start
* For local development outside of Docker, update the API base URL in `client/src/api.js`

## Student Data

The application is initialized with the following students:

```
Name                Email
-----------------------------------------
Adrian CHISĂLIȚĂ    adi.chisdalita@gmail.com
Alina CONSTANTIN    alinaconstantin1366@gmail.com
Andra RUSU          andra.rusua@gmail.com
Anton SZILAGYI      4everlg@gmail.com
Cristian ȚIC        cristi.tic88@gmail.com
Cristiano SILVA     cristiano.py@gmail.com
Eduard SUFRAGIU     sufragiu.eduard.04@gmail.com
Ionela SPIRIDON     ionela.spiridon45@gmail.com
Mario IANCU         mariobogdaniancu@gmail.com
Oana COLCERIU       colceriuoana@gmail.com
Patrick CRIȘAN      crisanpatrick@gmail.com
Ramona COPACI       copaciramona@gmail.com
Robert DENEȘ        denesrobertrobi@gmail.com
Sergiu GHERGHEL     gherghelsergiu70@gmail.com
Teodora CIUBUC      teodoraciubuc889@gmail.com
Titus CRĂCIUN       tituscraciun@gmail.com
Cristian BOGDAN     ccbogdan.2001@gmail.com
```
