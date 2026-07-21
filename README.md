# Jobs API

A RESTful API for managing job listings with user authentication, built with Express.js and MongoDB. The API features JWT-based authentication, comprehensive security measures, and full CRUD operations for job management.

## 🚀 Live Demo

**Production Server:** [https://jobs-api-0zk0.onrender.com/api/v1](https://jobs-api-0zk0.onrender.com/api/v1)

**API Documentation:** [https://jobs-api-0zk0.onrender.com/api-docs](https://jobs-api-0zk0.onrender.com/api-docs)

## ✨ Features

- **User Authentication**
  - User registration with secure password hashing (bcryptjs)
  - JWT-based login and authorization
  - Secure token-based access control

- **Job Management**
  - Create new job listings
  - Retrieve all jobs or specific job by ID
  - Update existing job information
  - Delete job listings
  - All job operations require authentication

- **Security Features**
  - Helmet.js for secure HTTP headers
  - CORS enabled for cross-origin requests
  - XSS protection with express-xss-sanitizer
  - Rate limiting (100 requests per 15 minutes)
  - Input validation with Joi
  - Password hashing with bcryptjs

- **API Documentation**
  - Swagger/OpenAPI 3.0 documentation
  - Interactive API testing via Swagger UI

## 🛠️ Tech Stack

- **Runtime:** Node.js 24.x
- **Framework:** Express.js 5.2.1
- **Database:** MongoDB with Mongoose 9.7.1
- **Authentication:** JWT (jsonwebtoken 9.0.3)
- **Security:** 
  - Helmet.js 8.2.0
  - bcryptjs 3.0.3
  - express-xss-sanitizer 2.0.2
  - express-rate-limit 8.5.2
- **Validation:** Joi 18.2.3
- **Documentation:** Swagger UI Express 5.0.1
- **Development:** Nodemon 3.1.14

## 📋 Prerequisites

- Node.js 24.x or higher
- MongoDB instance (local or cloud-based like MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Naveen-Kumar45/jobs-API.git
cd jobs-API
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

## 🚀 Running the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The application will start on the specified PORT (default: 5000) and connect to your MongoDB instance.

## 📚 API Endpoints

### Authentication Routes

#### Register User
- **Endpoint:** `POST /api/v1/auth/register`
- **Body:**
```json
{
  "name": "Rahul",
  "email": "rahul@email.com",
  "password": "rahul123"
}
```
- **Response:** 201 Created

#### Login User
- **Endpoint:** `POST /api/v1/auth/login`
- **Body:**
```json
{
  "email": "rahul@email.com",
  "password": "rahul123"
}
```
- **Response:** 200 OK (returns JWT token)

### Jobs Routes (Requires Authentication)

#### Get All Jobs
- **Endpoint:** `GET /api/v1/jobs`
- **Authorization:** Bearer Token (JWT)
- **Response:** 200 OK - Returns array of all jobs

#### Create Job
- **Endpoint:** `POST /api/v1/jobs`
- **Authorization:** Bearer Token (JWT)
- **Body:**
```json
{
  "company": "google",
  "position": "backend developer"
}
```
- **Response:** 201 Created

#### Get Single Job
- **Endpoint:** `GET /api/v1/jobs/:id`
- **Authorization:** Bearer Token (JWT)
- **Response:** 200 OK - Returns job details

#### Update Job
- **Endpoint:** `PATCH /api/v1/jobs/:id`
- **Authorization:** Bearer Token (JWT)
- **Body:**
```json
{
  "company": "microsoft",
  "position": "software developer"
}
```
- **Response:** 200 OK

#### Delete Job
- **Endpoint:** `DELETE /api/v1/jobs/:id`
- **Authorization:** Bearer Token (JWT)
- **Response:** 200 OK

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After logging in, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📖 Interactive API Documentation

Access the Swagger UI documentation at:
- **Local:** `http://localhost:3000/api-docs`
- **Production:** `https://jobs-api-0zk0.onrender.com/api-docs`

The Swagger UI allows you to:
- View all available endpoints
- See request/response schemas
- Test API endpoints directly
- View status codes and error messages

## 🏗️ Project Structure

```
jobs-API/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── swagger.yaml          # API documentation
├── db/
│   └── connect.js        # MongoDB connection
├── middlewares/          # Custom middleware functions
│   ├── authenticate.js   # JWT authentication middleware
│   ├── error-handler.js  # Error handling middleware
│   └── not-found.js      # 404 handling middleware
├── routes/               # API route handlers
│   ├── auth.js          # Authentication routes
│   └── jobs.js          # Job management routes
├── models/               # MongoDB schemas
└── controllers/          # Business logic
```

## 🛡️ Security Features

- **Rate Limiting:** Limits requests to 100 per 15 minutes per IP
- **XSS Protection:** Sanitizes user input to prevent cross-site scripting attacks
- **CORS:** Configured to allow safe cross-origin requests
- **Helmet:** Sets secure HTTP headers
- **Password Hashing:** Uses bcryptjs for secure password storage
- **Input Validation:** Joi schema validation for all requests

## 📦 Deployment

This API is deployed on [Render](https://render.com/). To deploy:

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Configure build and start commands:
   - **Build:** `npm install`
   - **Start:** `npm start`

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## 📝 License

ISC License - feel free to use this project for personal or commercial purposes.

## 👤 Author

**Naveen Kumar**
- GitHub: [@Naveen-Kumar45](https://github.com/Naveen-Kumar45)

## 📧 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Last Updated:** July 2026
