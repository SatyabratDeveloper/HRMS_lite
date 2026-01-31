# HRMS Lite

A lightweight, production-ready Human Resource Management System built with the MERN stack. This application allows administrators to manage employees and track daily attendance efficiently.

![HRMS Lite](https://img.shields.io/badge/HRMS-Lite-blue)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Routes](#frontend-routes)
- [Project Structure Details](#project-structure-details)
- [Features in Detail](#features-in-detail)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Employee Management
- ✅ Add new employees with unique Employee ID and email
- ✅ View all employees in a clean, organized table
- ✅ Delete employees from the system
- ✅ Form validation for all employee fields
- ✅ Duplicate employee ID and email prevention

### Attendance Tracking
- ✅ Mark daily attendance (Present/Absent) for employees
- ✅ View attendance history for any employee
- ✅ Attendance summary statistics (Total Days, Present Days, Absent Days)
- ✅ Update existing attendance records
- ✅ Date-based attendance tracking

### User Interface
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Clean and intuitive user experience
- ✅ Loading states and error handling
- ✅ Empty states for better UX
- ✅ Smooth animations and transitions
- ✅ Professional dashboard layout

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **React Router DOM 7.13.0** - Client-side routing
- **Axios 1.13.4** - HTTP client for API calls
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Vite 7.2.4** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9.1.5** - MongoDB object modeling
- **CORS 2.8.6** - Cross-origin resource sharing
- **dotenv 17.2.3** - Environment variable management

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart server during development

## 📁 Project Structure

```
HRMS Lite/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   ├── employeeController.js # Employee business logic
│   │   └── attendanceController.js # Attendance business logic
│   ├── middleware/
│   │   └── errorMiddleware.js    # Error handling middleware
│   ├── models/
│   │   ├── Employee.js           # Employee data model
│   │   └── Attendance.js         # Attendance data model
│   ├── routes/
│   │   ├── employeeRoutes.js     # Employee API routes
│   │   └── attendanceRoutes.js   # Attendance API routes
│   ├── server.js                 # Express server entry point
│   ├── package.json
│   └── .env                      # Environment variables (create this)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AttendanceForm.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeTable.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Attendance.jsx
│   │   │   └── Employees.jsx
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.jsx               # Main app component with routing
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md                     # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "HRMS Lite"
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Navigate to the `backend` folder
2. Create a `.env` file:

```bash
cd backend
touch .env
```

3. Add the following environment variables to `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/hrms_lite
PORT=5000
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hrms_lite?retryWrites=true&w=majority
PORT=5000
```

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/hrms_lite
PORT=5000
```

## ▶️ Running the Application

### Start the Backend Server

1. Open a terminal and navigate to the backend folder:

```bash
cd backend
```

2. Start the server:

```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

You should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

### Start the Frontend Development Server

1. Open a **new terminal** and navigate to the frontend folder:

```bash
cd frontend
```

2. Start the development server:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📡 API Endpoints

### Employee Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/employees` | Add a new employee | `{ employeeId, fullName, email, department }` |
| GET | `/api/employees` | Get all employees | - |
| DELETE | `/api/employees/:id` | Delete an employee | - |

### Attendance Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/attendance` | Mark attendance | `{ employeeId, date, status }` |
| GET | `/api/attendance/:employeeId` | Get attendance for employee | - |

### Example API Requests

**Add Employee:**
```bash
POST http://localhost:5000/api/employees
Content-Type: application/json

{
  "employeeId": "EMP001",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "department": "Engineering"
}
```

**Mark Attendance:**
```bash
POST http://localhost:5000/api/attendance
Content-Type: application/json

{
  "employeeId": "EMP001",
  "date": "2024-01-15",
  "status": "Present"
}
```

## 🎨 Frontend Routes

- `/` - Employee Management Page
- `/attendance` - Attendance Tracking Page

## 📊 Data Models

### Employee Model

```javascript
{
  employeeId: String (required, unique),
  fullName: String (required),
  email: String (required, unique, valid email),
  department: String (required),
  createdAt: Date (auto-generated)
}
```

### Attendance Model

```javascript
{
  employee: ObjectId (reference to Employee),
  date: Date (required),
  status: String (enum: "Present" | "Absent")
}
```

**Note:** The combination of `employee` and `date` is unique (one attendance record per employee per day).

## 🔒 Validation & Error Handling

### Backend Validation
- ✅ Required field validation
- ✅ Email format validation
- ✅ Unique employee ID validation
- ✅ Unique email validation
- ✅ Duplicate attendance prevention
- ✅ Proper HTTP status codes (400, 404, 409, 500)

### Frontend Validation
- ✅ Client-side form validation
- ✅ Real-time error messages
- ✅ Loading states
- ✅ Graceful error handling

## 🎯 Features in Detail

### Employee Management
- **Add Employee**: Create new employees with validation
- **View Employees**: Display all employees in a sortable table
- **Delete Employee**: Remove employees from the system
- **Empty State**: Helpful message when no employees exist

### Attendance Tracking
- **Mark Attendance**: Record daily attendance for employees
- **View History**: See complete attendance history per employee
- **Statistics**: View total days, present days, and absent days
- **Update Records**: Modify existing attendance entries

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem:** `MongoDB connection error`

**Solutions:**
1. Ensure MongoDB is running locally, or
2. Check your MongoDB Atlas connection string
3. Verify network connectivity
4. Check if the database name is correct

### Port Already in Use

**Problem:** `Port 5000 is already in use`

**Solution:** Change the PORT in `backend/.env`:
```env
PORT=5001
```

### CORS Errors

**Problem:** CORS errors in browser console

**Solution:** Ensure the backend CORS middleware is properly configured (already included in the code)

### Frontend Can't Connect to Backend

**Problem:** API calls failing

**Solutions:**
1. Verify backend is running on the correct port
2. Check `VITE_API_BASE_URL` in frontend `.env`
3. Ensure no firewall is blocking the connection

## 📝 Scripts

### Backend Scripts
```bash
npm run dev    # Start development server
```

### Frontend Scripts
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
npm run lint   # Run ESLint
```

## 🚀 Production Deployment

### Backend Deployment
1. Set production environment variables
2. Use a process manager like PM2
3. Configure MongoDB Atlas for production
4. Set up proper error logging

### Frontend Deployment
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder to a static hosting service (Vercel, Netlify, etc.)
3. Update `VITE_API_BASE_URL` to point to your production API

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built as a coding assignment for HRMS Lite application.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the robust database solution
- Express.js for the minimal web framework

---

**Note:** This is a production-ready application built for internal HR management. It does not include authentication as per requirements (single admin only).

For questions or issues, please open an issue on the repository.

