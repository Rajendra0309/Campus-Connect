# CampusConnect - College Community Web Portal

CampusConnect is a centralized social and utility platform for college students, serving as a hybrid of LinkedIn, a college forum, and resource-sharing space.

## Tech Stack

- **MongoDB** – Database
- **Express.js** – Backend API
- **React.js** – Frontend UI
- **Node.js** – Server runtime
- **Docker** – Containerization
- **Nginx** – Production web server
- **GitHub Actions** – CI/CD

## Key Features

- **Authentication** - JWT-based login/signup with roles
- **Forum** - Post questions and discussions
- **Marketplace** - Buy/sell used books and equipment
- **Resource Hub** - Upload/download study materials
- **Event Board** - Post and RSVP to events
- **Profiles** - Student profiles with skills and achievements

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js v18+ (for local development)
- MongoDB (local) or MongoDB Atlas account

### Option 1: Run with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Rajendra0309/Campus-Connect.git
cd Campus-Connect

# Start all services (MongoDB, Backend, Frontend)
docker-compose up --build

# Access the app
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api/test
```

### Option 2: Run with MongoDB Atlas (Production)

```bash
# Create .env.prod file
cat > .env.prod << EOF
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/campusconnect
JWT_SECRET=your_secret_key
EOF

# Run with production config
docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build

# Access: http://localhost (port 80)
```

### Option 3: Run Locally (Without Docker)

```bash
# Backend
cd backend
cp .env.example .env  # Edit with your MongoDB URI
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

## Project Structure

```
Campus-Connect/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   └── package.json
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy-aws.yml
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth | Login |
| GET | /api/auth | Get current user |
| GET | /api/posts | Get all posts |
| POST | /api/posts | Create post |
| GET | /api/marketplace | Get items |
| POST | /api/marketplace | List item |
| GET | /api/resources | Get resources |
| POST | /api/resources | Upload resource |
| GET | /api/events | Get events |
| POST | /api/events | Create event |

## Deployment

### CI/CD Pipeline
- **CI**: Runs tests and builds Docker images on push
- **CD**: Deploys to AWS ECR/ECS on main branch

### Environment Variables
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
NODE_ENV=production
```

## Author

**Rajendra Guutedar** - [GitHub](https://github.com/Rajendra0309)

## License

This project is open source and available under the MIT License.