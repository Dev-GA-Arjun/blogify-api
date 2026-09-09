# Blogify — Product Requirements Document

## 1. Product Overview

Blogify is a RESTful backend API for a blogging platform. It allows users to register and authenticate and provides APIs for creating, reading, updating, and deleting blog posts.

The application uses Node.js and Express for the backend and MongoDB with Mongoose for data storage and schema modeling.

## 2. Problem Statement

Users need a backend system where they can:

* Register an account.
* Log in securely.
* Create blog posts.
* View blog posts.
* View an individual blog post.
* Update blog posts.
* Delete blog posts.

The system should store blog and user data persistently in MongoDB while maintaining a structured data model.

## 3. Goals

The main goals of Blogify are:

1. Provide RESTful APIs for blog management.
2. Store users and posts in MongoDB.
3. Use Mongoose schemas to define the structure of MongoDB documents.
4. Implement complete CRUD operations for blog posts.
5. Validate input before performing database operations.
6. Protect post creation, updating, and deletion using authentication.
7. Maintain a relationship between users and their posts.

## 4. Functional Requirements

### 4.1 User Registration

The system shall allow a new user to register using:

* Username
* Email
* Password

The password is hashed before being stored in MongoDB.

### 4.2 User Login

The system shall authenticate users using their email and password.

After successful authentication, the system generates a JWT and stores it in an HTTP-only cookie.

### 4.3 Create Post

Authenticated users shall be able to create a post containing:

* Title
* Content
* Author

The post is stored as a MongoDB document.

### 4.4 Read Posts

The system shall provide:

* An endpoint to retrieve all posts.
* An endpoint to retrieve a post by its ID.

The API also supports filtering posts by author, sorting, pagination, and populating author information.

### 4.5 Update Post

Authenticated users shall be able to update a post using its ID.

The update operation uses Mongoose validation through `runValidators: true`.

### 4.6 Delete Post

Authenticated users shall be able to delete a post using its ID.

Before deletion, the system verifies that the authenticated user is the author of the post.

## 5. MongoDB Requirements

MongoDB is used as the persistent database.

Mongoose provides the schema modeling layer between the Node.js application and MongoDB.

The system contains two main models:

* User
* Post

### User Model

The User document contains:

* `username`
* `email`
* `password`
* `createdAt`
* `updatedAt`

### Post Model

The Post document contains:

* `title`
* `content`
* `author`
* `createdAt`
* `updatedAt`

The `author` field stores a MongoDB ObjectId that references the User model.

## 6. CRUD Requirements

Blogify implements the four basic CRUD operations for posts.

| Operation | HTTP Method | Endpoint            | MongoDB/Mongoose Operation  |
| --------- | ----------- | ------------------- | --------------------------- |
| Create    | POST        | `/api/v1/posts`     | `Posts.create()`            |
| Read all  | GET         | `/api/v1/posts`     | `Posts.find()`              |
| Read one  | GET         | `/api/v1/posts/:id` | `Posts.findById()`          |
| Update    | PATCH       | `/api/v1/posts/:id` | `Posts.findByIdAndUpdate()` |
| Delete    | DELETE      | `/api/v1/posts/:id` | `Posts.findByIdAndDelete()` |

## 7. Data Relationship

A user can have multiple posts.

The relationship is represented using the `author` field in the Post model.

The field is defined as:

```javascript
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
}
```

This means the post stores the referenced user's MongoDB ObjectId rather than duplicating the complete user document.

Mongoose `populate()` is then used when reading posts to retrieve selected user information.

## 8. Non-Functional Requirements

### Security

* Passwords must not be stored as plain text.
* Protected routes require authentication.
* JWT is used for authentication.
* Authentication cookies are configured as HTTP-only.

### Data Integrity

* Required fields are enforced through Mongoose schemas.
* Unique constraints are defined for username and post title.
* Update operations use Mongoose validators.
* Invalid MongoDB IDs are handled by the error handler.

### Maintainability

The backend separates responsibilities into:

* Routes
* Controllers
* Services
* Models
* Middleware
* Configuration

## 9. Success Criteria

The project is considered successful when:

* Users can register and log in.
* Posts can be created.
* Posts can be retrieved individually and as a collection.
* Posts can be updated.
* Posts can be deleted.
* MongoDB persists the application data.
* Mongoose schemas enforce the defined document structure.
* User-post relationships can be represented and populated.
