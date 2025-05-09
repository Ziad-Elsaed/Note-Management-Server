# 🗒️ Note Management API

A simple RESTful API for managing notes with user authentication and authorization, built using **Node.js**, **Express**, **MongoDB**, and **JWT**. Includes input validation with **express-validator**.

## 🚀 Features

- ✅ User Registration & Login
- 🔐 JWT Authentication
- ✍️ CRUD Operations for Notes
- 🧑‍💻 Only Authors Can Modify Their Own Notes
- 🚪 Validation with express-validator
- 💾 MongoDB + Mongoose

## 📁 Folder Structure

NoteAPI/  
│  
├── middleware/  
│ ├── expValidatorResult.js  
│ ├── noteValid.js  
│ ├── tokenValid.js  
│ └── userValid.js  
│  
├── models/  
│ ├── Note.js  
│ └── User.js  
│
├── routes/  
│ ├── note.js  
│ └── user.js  
│  
├── .env  
├── .gitignore  
├── package.json  
├── package-lock.json  
└── server.js  

## API Documentation

### 🔐 Auth Routes
| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | /register | Register new user   |
| POST   | /login    | Login and get token |

### 📝 Note Routes (JWT Required)
| Method | Endpoint    | Description               |
| ------ | ----------- | ------------------------- |
| GET    | /notes      | Get all notes             |
| GET    | /notes/\:id | Get a single note         |
| POST   | /notes      | Create a new note         |
| PATCH  | /notes/\:id | Update note (author only) |
| DELETE | /notes/\:id | Delete note (author only) |


## 🛠 Setup Instructions

### 1. Clone the Repository or Download Project

### 2. Install Dependencies
```npm install```

### 3. Configure Environment Variables 
Create a .env file in the root folder with:
```
# MongoDB connection string
DATA_BASE=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# JWT secret key
SECRET_KEY=your_jwt_secret

# App port
PORT=5000
```
### 4. Run the Server
```
npx nodemon server.js
or 
npm run dev
or
node server.js
```

## 📫 Contact Me
Feel free to reach out if you have any questions or suggestions:

=> GitHub: https://github.com/Ziad-Elsaed  

=> Email: ziadlelsaidibrahem@gmail.com  

=> LinkedIn: www.linkedin.com/in/ziadelsaid  










