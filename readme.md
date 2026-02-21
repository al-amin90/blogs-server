# 📝 Blog Platform API

A robust and scalable backend system for a modern blogging platform built with TypeScript, Node.js, Express, and MongoDB. This API provides secure authentication, role-based access control, and comprehensive blog management features.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 🌐 Live URL

**Production:** [https://blogs-server-dun.vercel.app](https://blogs-server-dun.vercel.app)

## ✨ Features

### 🔐 Authentication & Authorization

- Secure user registration and login with JWT tokens
- Password hashing using bcrypt
- Role-based access control (Admin & User)
- Protected routes with middleware authentication

### 📰 Blog Management

- **Create** blogs with title and content
- **Read** all blogs with advanced filtering options
- **Update** own blogs (users only)
- **Delete** own blogs (users) or any blog (admin)
- Author information populated in responses

### 🔍 Advanced Query Features

- **Search**: Find blogs by title or content
- **Sort**: Order blogs by any field (createdAt, title, etc.)
- **Filter**: Filter blogs by author ID
- **Pagination**: Limit and page through results

### 👨‍💼 Admin Capabilities

- Block/unblock users
- Delete any blog post
- Manage platform content and users

### 🛡️ Security Features

- JWT-based authentication
- Password encryption
- Input validation with Zod
- Protected API endpoints
- CORS enabled

## 🚀 Technology Stack

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| **TypeScript** | Type-safe JavaScript development  |
| **Node.js**    | Runtime environment               |
| **Express.js** | Web application framework         |
| **MongoDB**    | NoSQL database                    |
| **Mongoose**   | MongoDB object modeling           |
| **JWT**        | Secure token-based authentication |
| **Bcrypt**     | Password hashing                  |
| **Zod**        | Schema validation                 |
| **dotenv**     | Environment variable management   |

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn package manager
- Git

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/al-amin90/blogs-server.git
cd blogs-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_jwt_secret_key
JWT_ACCESS_EXPIRES_IN=7d
```

### 4. Build the Project

```bash
npm run build
```

### 5. Run the Application

**Development Mode:**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL

```
https://blogs-server-dun.vercel.app/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "648a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Blog Endpoints

#### Create Blog

```http
POST /api/blogs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Blog",
  "content": "This is the content of my blog post."
}
```

#### Get All Blogs (Public)

```http
GET /api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId
```

**Query Parameters:**

- `search` - Search by title or content
- `sortBy` - Sort by field (e.g., createdAt, title)
- `sortOrder` - asc or desc
- `filter` - Filter by author ID

#### Update Blog

```http
PATCH /api/blogs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete Blog

```http
DELETE /api/blogs/:id
Authorization: Bearer <token>
```

### Admin Endpoints

#### Block User

```http
PATCH /api/admin/users/:userId/block
Authorization: Bearer <admin_token>
```

#### Delete Any Blog

```http
DELETE /api/admin/blogs/:id
Authorization: Bearer <admin_token>
```

## 🗂️ Project Structure

```
blogs-server/
├── src/
│   ├── app/
│   │   ├── builder/
│   │   │   └── QueryBuilder.ts
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   ├── validateRequest.ts
│   │   │   └── globalErrorHandler.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.validation.ts
│   │   │   │   └── auth.route.ts
│   │   │   ├── user/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── user.interface.ts
│   │   │   │   └── user.utils.ts
│   │   │   ├── blog/
│   │   │   │   ├── blog.controller.ts
│   │   │   │   ├── blog.service.ts
│   │   │   │   ├── blog.model.ts
│   │   │   │   ├── blog.interface.ts
│   │   │   │   ├── blog.validation.ts
│   │   │   │   └── blog.route.ts
│   │   │   └── admin/
│   │   │       ├── admin.controller.ts
│   │   │       ├── admin.service.ts
│   │   │       └── admin.route.ts
│   │   └── routes/
│   │       └── index.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── vercel.json
```

## 🔒 Data Models

### User Model

```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  role: "admin" | "user" (default: "user")
  isBlocked: boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

### Blog Model

```typescript
{
  title: string
  content: string
  author: ObjectId (ref: User)
  isPublished: boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

## 🛠️ Error Handling

The API uses a standardized error response format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": {
    "details": "Additional error information"
  },
  "stack": "Error stack trace (development only)"
}
```

**Error Types:**

- **Validation Error (400)** - Invalid input data
- **Authentication Error (401)** - Invalid or missing token
- **Authorization Error (403)** - Insufficient permissions
- **Not Found Error (404)** - Resource not found
- **Internal Server Error (500)** - Server-side issues

## 🧪 Testing

Test the API using tools like:

- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/)
- [Insomnia](https://insomnia.rest/)

Import the API collection or manually test endpoints using the documentation above.

## 📝 Scripts

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "lint": "eslint src --ext .ts",
  "format": "prettier --write \"src/**/*.ts\""
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Al Amin Parvaz**

- GitHub: [@al-amin90](https://github.com/al-amin90)
- Email: ijesun30@gmail.com
- Phone: +8801752736250

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- MongoDB team for the powerful database
- TypeScript for type safety
- All contributors and supporters

---

<div align="center">
  <p>Made with ❤️ by Al Amin Parvaz</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
