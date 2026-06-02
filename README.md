# Blogify  [Link](https://blogify-api-8odv.onrender.com/)

> A clean, secure RESTful blog API with JWT authentication — built to power modern blogging platforms.

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-F7B731?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render&logoColor=white)

---

## Description

Blogify is a fully-featured RESTful API that powers a blogging platform with secure user authentication and complete post management. It handles user registration, login, and profile management alongside full CRUD operations for blog posts, all protected by JWT-based authorization. Built with Node.js, Express, and MongoDB Atlas, it is designed for easy deployment and straightforward integration with any frontend client.

---

## Features

- **User authentication** — Secure registration and login using JSON Web Tokens (JWT)
- **Password hashing** — Passwords encrypted at rest using bcrypt
- **Blog post CRUD** — Create, read, update, and delete blog posts
- **User profiles** — View and update your own profile
- **Input validation** — Request body validation with descriptive error messages
- **Protected routes** — Middleware-guarded endpoints for authenticated users only
- **RESTful design** — Consistent, predictable API structure following REST conventions

---

## Tech Stack

| Layer             | Technology                 |
| ----------------- | -------------------------- |
| Runtime           | Node.js 18.x               |
| Framework         | Express.js 4.x             |
| Database          | MongoDB Atlas via Mongoose |
| Authentication    | JSON Web Tokens (JWT)      |
| Password Security | bcrypt                     |
| Deployment        | Render                     |

---

## API Endpoints

### Auth

| Method | Endpoint             | Description                 | Auth Required |
| ------ | -------------------- | --------------------------- | ------------- |
| `POST` | `/api/auth/register` | Register a new user         | ❌            |
| `POST` | `/api/auth/login`    | Login and receive JWT token | ❌            |

### Profile

| Method  | Endpoint       | Description                   | Auth Required |
| ------- | -------------- | ----------------------------- | ------------- |
| `GET`   | `/api/profile` | Get current user's profile    | ✅            |
| `PATCH` | `/api/profile` | Update current user's profile | ✅            |

### Blog Posts

| Method   | Endpoint         | Description             | Auth Required |
| -------- | ---------------- | ----------------------- | ------------- |
| `GET`    | `/api/posts`     | Get all blog posts      | ❌            |
| `GET`    | `/api/posts/:id` | Get a single post by ID | ❌            |
| `POST`   | `/api/posts`     | Create a new post       | ✅            |
| `PATCH`  | `/api/posts/:id` | Update an existing post | ✅            |
| `DELETE` | `/api/posts/:id` | Delete a post           | ✅            |

> Protected routes require an `Authorization: Bearer <token>` header.

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/blogify?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
```

| Variable         | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `PORT`           | Port the server runs on (default: `5000`)                    |
| `NODE_ENV`       | Environment — `development` or `production`                  |
| `MONGODB_URI`    | MongoDB Atlas connection string                              |
| `JWT_SECRET`     | Secret key for signing JWT tokens (use a long random string) |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. `7d`, `24h`)                     |

---

## Installation & Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v8 or higher
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works fine)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/blogify.git
cd blogify
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Set Up MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Click **"Build a Database"** and choose the **free M0 tier**.
3. Choose a cloud provider and region, then click **"Create"**.
4. Under **"Security > Database Access"**, create a new database user with a username and password. Save these — you'll need them in your connection string.
5. Under **"Security > Network Access"**, click **"Add IP Address"** and either add your current IP or allow access from anywhere (`0.0.0.0/0`) for development.
6. Once the cluster is created, click **"Connect"**, choose **"Connect your application"**, and copy the connection string. It will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace `<username>` and `<password>` with your database user credentials, and append your database name before the `?`:
   ```
   mongodb+srv://alice:mypassword@cluster0.xxxxx.mongodb.net/blogify?retryWrites=true&w=majority
   ```

### Step 4 — Configure Environment Variables

Create a `.env` file in the root of the project:

```bash
cp .env.example .env
```

Open `.env` and fill in your values (see [Environment Variables](#-environment-variables) above). For `JWT_SECRET`, use a long, random string — you can generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 5 — Start the Development Server

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

For production:

```bash
npm start
```

---

## Testing with Postman

### Setup

1. Download and install [Postman](https://www.postman.com/downloads/).
2. Set the base URL as an environment variable in Postman:
   - **Variable:** `BASE_URL`
   - **Value:** `http://localhost:5000` (or your deployed URL)
3. After logging in, copy the returned `token` and add it as a Postman environment variable (`TOKEN`).
4. For protected routes, add a header in Postman:
   - **Key:** `Authorization`
   - **Value:** `Bearer {{TOKEN}}`

---

### Example Request Bodies

#### Register a New User

`POST {{BASE_URL}}/api/auth/register`

```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "SecurePass123!"
}
```

**Response (201 Created):**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### Login

`POST {{BASE_URL}}/api/auth/login`

```json
{
  "email": "alice@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123...",
    "name": "Alice Johnson",
    "email": "alice@example.com"
  }
}
```

---

#### Create a New Post _(Protected)_

`POST {{BASE_URL}}/api/posts`
Header: `Authorization: Bearer {{TOKEN}}`

```json
{
  "title": "Getting Started with Node.js",
  "content": "Node.js is a JavaScript runtime built on Chrome's V8 engine...",
  "tags": ["nodejs", "javascript", "backend"]
}
```

**Response (201 Created):**

```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "64def456...",
    "title": "Getting Started with Node.js",
    "content": "Node.js is a JavaScript runtime...",
    "tags": ["nodejs", "javascript", "backend"],
    "author": "64abc123...",
    "createdAt": "2024-11-15T10:30:00.000Z"
  }
}
```

---

#### Update Your Profile _(Protected)_

`PATCH {{BASE_URL}}/api/profile`
Header: `Authorization: Bearer {{TOKEN}}`

```json
{
  "name": "Alice J. Smith",
  "bio": "Full-stack developer and tech writer."
}
```

---

## Deployment on Render

Blogify is configured for deployment on [Render](https://blogify-api-8odv.onrender.com/).

### Steps

1. Push your project to a GitHub repository.
2. Go to [render.com](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under **"Environment Variables"**, add all the variables from your `.env` file. Do **not** upload your `.env` file to GitHub.
6. Click **"Deploy"**.

### Notes

- Make sure `NODE_ENV` is set to `production` on Render.
- Your MongoDB Atlas cluster's Network Access must allow connections from `0.0.0.0/0` (all IPs), since Render uses dynamic IPs.
- Render spins down free-tier services after inactivity — the first request after idle may take a few seconds to respond.

---

## 📁 Project Structure

```
blogify/
├── controllers/
│   ├── authController.js
│   ├── postController.js
│   └── profileController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Post.js
├── routes/
│   ├── authRoutes.js
│   ├── postRoutes.js
│   └── profileRoutes.js
├── .env.example
├── .gitignore
├── app.js
├── server.js
└── package.json
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ☕ and Node.js</p>
