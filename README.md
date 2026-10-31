# blog-platform
Here is a complete, production-ready full-stack blueprint for your Blog Platform with Comments, built using Node.js (Express), JavaScript, and SQLite (easily swappable to PostgreSQL or MySQL). This design implements complete user authentication with JWTs, secure CRUD operations for blog posts, and an integrated comment system.
# Full-Stack Blog Platform Backend API

A lightweight, robust, production-ready RESTful API backend engine for a blogging platform featuring user authentication, post creation, and real-time user comment threads. Built with Node.js, Express, and an automated localized SQLite relational file storage layer.

## 🚀 Key Features
- **User Authentication:** Secure user registration, credential hashing with `bcryptjs`, and stateless validation via JSON Web Tokens (JWT).
- **Post Management (CRUD):** Authors can seamlessly create, edit, or delete posts while keeping reading actions entirely public.
- **Relational Comment Stream:** Publicly displays comments chronologically while requiring an explicit JWT login state for posting thoughts.
- **Zero Configuration DB:** Self-starting localized `sqlite3` driver which creates standard tables instantly on initialization without manual migrations.

## 💻 Tech Stack
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (via `sqlite3` driver)
- **Security & Tokens:** `bcryptjs` and `jsonwebtoken`

## 📂 Directory Layout
```text
blog-platform/
├── config/
│   └── database.js      # Relational storage schema initialization
├── middleware/
│   └── auth.js          # Stateless JWT Verification Interceptor
├── routes/
│   ├── auth.js          # Access registration/sign-in streams
│   ├── posts.js         # Core post manipulation methods
│   └── comments.js      # Comment thread management handles
├── server.js            # Global port configuration mapping
├── package.json         # Dependency tree manifestation
└── blog.db              # Local runtime database (Created on start)
```

## 🛠️ Step-by-Step Installation

1. **Clone or create the folder structure** on your local machine.
2. **Navigate into the workspace:**
   ```bash
   cd blog-platform
   ```
3. **Install application dependencies:**
   ```bash
   npm install
   ```
4. **Configure Environment variables:**  
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   JWT_SECRET=your_super_secure_unbreakable_secret_key
   ```
5. **Fire up the engine:**
   ```bash
   node server.js
   ```
   *The console should output: `Connected to SQLite Database.` and `Server executing seamlessly on port 5000`.*

---

## 🛣️ API Documentation Matrix

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Payload Schema | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/register` | Register a new blogger | `{ "username": "john", "email": "j@test.com", "password": "123" }` | No |
| **POST** | `/login` | Authenticate and obtain JWT | `{ "email": "j@test.com", "password": "123" }` | No |

### Blog Posts Endpoints (`/api/posts`)

| Method | Endpoint | Description | Headers Requirement | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Fetch all articles sorted chronologically | None | No |
| **POST** | `/` | Add a new blog post | `Authorization: Bearer <JWT_TOKEN>` | **Yes** |
| **PUT** | `/:id` | Modify an existing post (Author only) | `Authorization: Bearer <JWT_TOKEN>` | **Yes** |
| **DELETE**| `/:id` | Remove a blog post entirely (Author only) | `Authorization: Bearer <JWT_TOKEN>` | **Yes** |

### Comments Endpoints (`/api/comments`)

| Method | Endpoint | Description | Headers Requirement | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/:postId` | Fetch all nested comment tags for a post | None | No |
| **POST** | `/:postId` | Add a comment statement to an article | `Authorization: Bearer <JWT_TOKEN>` | **Yes** |

---

## 📊 Relational Database Design
The SQLite database mounts three integrated structures backed by cascading lookup references:
*   `users` table ➡️ Stores unique identities and hashed credentials.
*   `posts` table ➡️ Contains markdown data strings tied directly to a `user_id`.
*   `comments` table ➡️ Maps individual entries back to both a specific `post_id` and structural `user_id`.

## 📄 License
This architecture blueprint is open-source and free to adapt for personal or production usage under the [MIT License](LICENSE).
