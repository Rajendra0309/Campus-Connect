# CampusConnect - College Community Web Portal

CampusConnect is a centralized social and utility platform for college students, serving as a hybrid of LinkedIn, a college forum, and resource-sharing space.

## 🔍 Project Overview

CampusConnect allows students to:
- Share updates, event information, and achievements
- Collaborate on projects or study groups
- Access notes, previous year question papers, and assignments
- Buy/sell/rent used books and equipment (Marketplace)
- Post questions and get answers from peers and faculty

## Tech Stack (MERN)

- **MongoDB** – For storing users, posts, comments, resources, etc.
- **Express.js** – Backend API and routing
- **React.js** – Frontend interface with component-based architecture
- **Node.js** – Server-side logic

## Key Features

### 1. Authentication
- JWT-based login/signup with roles: Student, Faculty, Admin

### 2. Forum
- Post questions and discussions
- Comment and upvote answers

### 3. Marketplace
- List and browse second-hand books/study material/equipment
- Filter items by category, price, and status

### 4. Resource Hub
- Upload/download PDFs (lecture notes, guides, papers)
- Category-wise filtering (Subject/Department/Semester)

### 5. Event Board
- Post upcoming fests, competitions, and meetups
- RSVP feature for events

### 6. Profile Section
- Student profile with skills, achievements, and projects
- Optional links to GitHub, LinkedIn, etc.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rajendra0309/Campus-Connect.git
cd campusconnect
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campusconnect
JWT_SECRET=your_jwt_secret_key
```

5. Start the backend server
```bash
cd backend
npm run dev
```

6. Start the frontend server
```bash
cd frontend
npm start
```

7. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth` - Login
- `GET /api/auth` - Get logged in user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update user profile

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create a post
- `DELETE /api/posts/:id` - Delete a post
- `PUT /api/posts/like/:id` - Like a post
- `PUT /api/posts/unlike/:id` - Unlike a post

### Comments
- `POST /api/comments/:post_id` - Create a comment
- `PUT /api/comments/upvote/:id` - Upvote a comment
- `DELETE /api/comments/:id` - Delete a comment

### Marketplace
- `GET /api/marketplace` - Get all marketplace items
- `GET /api/marketplace/:id` - Get marketplace item by ID
- `POST /api/marketplace` - Create a marketplace item
- `PUT /api/marketplace/:id` - Update a marketplace item
- `DELETE /api/marketplace/:id` - Delete a marketplace item

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/filter` - Get filtered resources
- `GET /api/resources/:id` - Get resource by ID
- `POST /api/resources` - Upload a resource
- `PUT /api/resources/download/:id` - Increment download count
- `DELETE /api/resources/:id` - Delete a resource

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create an event
- `PUT /api/events/attend/:id` - Attend/unattend an event
- `DELETE /api/events/:id` - Delete an event

## Project Structure

```
campusconnect/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── actions/
    │   ├── components/
    │   ├── reducers/
    │   ├── App.js
    │   ├── index.js
    │   └── store.js
    └── package.json
```

## Screenshots

[screenshots will be added in future]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Authors

- Rajendra Guutedar - [GitHub Profile](https://github.com/Rajendra0309)

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redux](https://redux.js.org/)
- [Font Awesome](https://fontawesome.com/)
- [Bootstrap](https://getbootstrap.com/)
