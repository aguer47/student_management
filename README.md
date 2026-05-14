# Student Management API

A comprehensive REST API for managing students and courses with OAuth 2.0 authentication, built with Node.js, Express, and MongoDB.

## Features

- ✅ Full CRUD operations for Students and Courses
- ✅ MongoDB database integration
- ✅ Google OAuth 2.0 authentication
- ✅ Input validation and error handling
- ✅ Swagger API documentation
- ✅ Session-based authentication

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- Google Cloud Console account (for OAuth)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aguer47/student_management.git
cd student_management
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see OAuth Setup below)

4. Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:8080`

## Google OAuth 2.0 Setup (REQUIRED)

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

### Step 2: Create OAuth 2.0 Credentials

1. In the Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure the OAuth consent screen if prompted:
   - User Type: External
   - App name: Student Management API
   - User support email: your-email@example.com
   - Developer contact information: your-email@example.com
4. For the application type, select "Web application"
5. Add authorized redirect URIs:
   - `http://localhost:8080/auth/google/callback`
   - If deploying to production, add your production callback URL
6. Click "Create"

### Step 3: Update Your .env File

Replace the placeholder values in your `.env` file:

```env
GOOGLE_CLIENT_ID=your_actual_client_id_from_google
GOOGLE_CLIENT_SECRET=your_actual_client_secret_from_google
SESSION_SECRET=generate_a_random_string_here_at_least_32_characters
```

### Step 4: Generate a Session Secret

You can generate a random session secret using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use an online generator for a 32+ character random string.

## API Endpoints

### Authentication

- `GET /auth/google` - Initiate Google OAuth login
- `GET /auth/google/callback` - OAuth callback (handled automatically)
- `GET /auth/user` - Get current authenticated user
- `GET /auth/logout` - Logout current user

### Students

- `GET /students` - Get all students
- `POST /students` - Create a new student
- `GET /students/:id` - Get student by ID
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

### Courses

- `GET /courses` - Get all courses
- `POST /courses` - Create a new course
- `GET /courses/:id` - Get course by ID
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

### General

- `GET /` - Welcome message
- `GET /api-docs` - Swagger API documentation

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
SESSION_SECRET=your_random_session_secret
```

## Testing the API

1. Start the server: `npm run dev`
2. Visit `http://localhost:8080/api-docs` for interactive API documentation
3. Test OAuth login at `http://localhost:8080/auth/google`
4. Use tools like Postman or curl to test API endpoints

## Project Structure

```
├── config/
│   └── passport.js          # Passport OAuth configuration
├── controllers/
│   ├── courses.js           # Course CRUD operations
│   └── students.js          # Student CRUD operations
├── data/
│   └── database.js          # MongoDB connection
├── middleware/
│   └── auth.js              # Authentication middleware
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── courses.js           # Course routes
│   ├── index.js             # Main router
│   └── students.js          # Student routes
├── swagger/
│   └── swagger.json         # API documentation
├── validation/
│   ├── validate.js          # Student validation
│   └── validateCourse.js    # Course validation
├── .env                     # Environment variables
├── package.json
├── server.js                # Main application file
└── README.md
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with MongoDB Driver
- **Authentication**: Passport.js with Google OAuth 2.0
- **Validation**: Validator.js
- **Documentation**: Swagger UI
- **Session Management**: express-session

## License

ISC
