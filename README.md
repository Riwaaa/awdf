# AWDF Portfolio + Full Stack Task Manager (Practicals 1-7)

This repository continues the React portfolio from Practicals 1-3 and the Express Task Manager API from Practical 4.

## Practical 5 - MongoDB + Mongoose
- MongoDB persistence with Mongoose
- Task schema: title, description, completed, priority, createdAt, user
- CRUD using Mongoose model methods
- Structured validation errors

## Practical 6 - Full Stack Integration
- React frontend calls the Express API
- CORS enabled for `http://localhost:5173`
- Create, read, update, and delete tasks from the UI
- Loading and error states

## Practical 7 - Authentication + Middleware
- Register/login with bcrypt password hashing
- JWT tokens with 1 hour expiry
- Auth middleware protects task routes
- Server-side task validation
- `/me` protected endpoint

## Run backend
```bash
cd task-manager-api
npm install
cp .env.example .env
# Edit .env and set MONGO_URI + JWT_SECRET
npm run dev
```

## Run frontend
```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

> Never commit `.env` or real database/JWT secrets.
