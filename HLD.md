# Blogify — High Level Design

## 1. System Overview

Blogify is a RESTful backend application built using Node.js, Express, MongoDB, and Mongoose.

The application follows a layered backend architecture:

```text
Client
   |
   v
Express Routes
   |
   v
Middleware
   |
   v
Controllers
   |
   v
Services
   |
   v
Mongoose Models
   |
   v
MongoDB Atlas
```

## 2. Technology Stack

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* express-validator
* dotenv

## 3. Backend Architecture

### Routes

Routes define the HTTP endpoints exposed by the API.

Relevant files:

```text
src/routes/auth.routes.js
src/routes/posts.routes.js
src/routes/index.js
```

The main router is mounted under:

```text
/api/v1
```

Post routes are therefore available under:

```text
/api/v1/posts
```

### Middleware

Authentication is handled by:

```text
src/middleware/auth.middleware.js
```

The middleware verifies the JWT and attaches the authenticated user to:

```javascript
req.user
```

Validation rules are defined in:

```text
src/routes/posts.routes.js
src/middleware/validators.js
```

### Controllers

Controllers handle HTTP requests and responses.

Post controller:

```text
src/controllers/posts.controller.js
```

The controller receives the request, performs validation and request-level checks, calls the service layer, and returns the HTTP response.

### Services

Database-related post operations are placed in:

```text
src/services/posts.services.js
```

This layer communicates with the Mongoose Post model.

### Models

MongoDB data structures are defined using Mongoose schemas.

```text
src/models/users.models.js
src/models/posts.models.js
```

## 4. Database Architecture

MongoDB Atlas is used as the database.

Mongoose provides the application-level schema and database interaction layer.

The application contains two main models:

```text
User
Post
```

The relationship is:

```text
User
  |
  | 1
  |
  | *
  v
Post
```

One user can have multiple posts.

Each Post stores the user's ObjectId in the `author` field.

## 5. MongoDB Schema Design

### User

The User schema contains:

```text
username
email
password
createdAt
updatedAt
```

Important constraints:

* `username` is required.
* `username` is unique.
* `username` is trimmed.
* `email` is required.
* `email` is converted to lowercase.
* `password` is required.
* Timestamps are automatically maintained.

### Post

The Post schema contains:

```text
title
content
author
createdAt
updatedAt
```

Important constraints:

* `title` is required.
* `title` is unique.
* `title` is trimmed.
* `content` is required.
* `author` is required.
* `author` is stored as a MongoDB ObjectId.
* `author` references the User model.
* Timestamps are automatically maintained.

## 6. MongoDB CRUD Flow

### Create

Request:

```text
POST /api/v1/posts
```

Flow:

```text
Client
  -> Posts Route
  -> Authentication Middleware
  -> createPost Controller
  -> postService.createPost()
  -> Posts.create()
  -> MongoDB
```

The service uses:

```javascript
const newPost = await Posts.create(postData);
```

MongoDB creates and stores the new document.

### Read All

Request:

```text
GET /api/v1/posts
```

Flow:

```text
Client
  -> Route
  -> getAllPosts Controller
  -> postService.getAllPosts()
  -> Posts.find()
  -> MongoDB
```

The query also supports:

* Author filtering
* Sorting
* Pagination
* Author population

### Read One

Request:

```text
GET /api/v1/posts/:id
```

The service uses:

```javascript
Posts.findById(id)
```

The query also uses:

```javascript
.populate('author', 'username email')
```

to retrieve selected information about the referenced user.

### Update

Request:

```text
PATCH /api/v1/posts/:id
```

Flow:

```text
Client
  -> Route
  -> Authentication Middleware
  -> updatePost Controller
  -> postService.updatePost()
  -> Posts.findByIdAndUpdate()
  -> MongoDB
```

The update uses:

```javascript
{
    returnDocument: 'after',
    runValidators: true
}
```

Therefore, the updated document is returned and Mongoose validation is applied.

### Delete

Request:

```text
DELETE /api/v1/posts/:id
```

Before deletion:

1. The post is retrieved.
2. The authenticated user's ID is obtained from `req.user`.
3. The post's author is compared with the authenticated user.
4. If the user is authorized, the post is deleted.

The service performs deletion using:

```javascript
Posts.findByIdAndDelete(id)
```

## 7. Data Access Responsibility

The system separates database operations from HTTP handling.

For example:

```text
posts.controller.js
        |
        v
posts.services.js
        |
        v
posts.models.js
        |
        v
MongoDB
```

This prevents the controller from containing all database logic and makes the service layer responsible for post data operations.

## 8. Error Handling

Database and application errors are passed to the error handler in:

```text
src/index.js
```

The error handler specifically handles:

* `CastError`
* Duplicate key error `11000`
* `ValidationError`
* Other unexpected errors

For example, an invalid MongoDB ObjectId can produce a Mongoose `CastError`, which is converted into an HTTP 404 response.

## 9. Database Connection

The MongoDB connection is implemented in:

```text
src/config/db.js
```

The connection uses:

```javascript
mongoose.connect(MONGODB_URI)
```

The MongoDB URI is obtained from the environment:

```javascript
process.env.MONGODB_URI
```

This keeps the database connection string outside the source code.

## 10. Main Design Decisions

### Mongoose for Schema Modeling

Mongoose is used to define document structure, validation, relationships, timestamps, and database operations.

### ObjectId Reference

Posts store an ObjectId reference to the User rather than embedding the complete user object.

This avoids duplicating user information in every post.

### Service Layer

Post database operations are placed in the service layer, keeping controllers focused on HTTP request and response handling.

### Authentication Before Modification

Creating, updating, and deleting posts require authentication.

Deletion additionally checks that the authenticated user owns the post.
