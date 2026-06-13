# User Management API

A RESTful User Management API built with [NestJS](https://nestjs.com/) and TypeScript. Uses [lowdb](https://www.npmjs.com/package/lowdb) as a lightweight file-based JSON database.

## Features

- Full CRUD operations for users
- Input validation via `class-validator`
- Interactive API documentation via Swagger UI
- MVC architecture with OOP principles (Inheritance, Abstraction, Encapsulation)
- Unit tested service and model layers

## Tech Stack

| Technology | Version |
|---|---|
| Node.js | ≥ 14 |
| NestJS | ^8 |
| TypeScript | ^4.4 |
| lowdb | ^1.0 |
| class-validator | ^0.13 |
| @nestjs/swagger | ^5 |

## Getting Started

### Prerequisites

- Node.js ≥ 14
- npm ≥ 6

### Installation

```bash
npm install
```

### Environment Setup

Copy the example env file and adjust if needed:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on |

### Running the App

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run build
npm run start:prod

# Serve (alias for start)
npm run serve
```

The server starts at `http://localhost:3000`.

## API Documentation

Interactive Swagger UI is available at:

```
http://localhost:3000/api/docs
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/user` | Get all users |
| `GET` | `/user/:id` | Get a user by ID |
| `POST` | `/user` | Create a new user |
| `PUT` | `/user/:id` | Update a user by ID |
| `DELETE` | `/user/:id` | Delete a user by ID |

### Example Request — Create User

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john.doe@example.com"}'
```

### Example Response

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

## Running Tests

```bash
# Unit tests
npm run test

# Unit tests with coverage
npm run test:cov

# End-to-end tests
npm run test:e2e
```

## Project Structure

```
src/
├── models/
│   ├── base.model.ts          # Base class with id field
│   ├── user.model.ts          # User entity extending BaseModel
│   └── user.model.spec.ts     # Unit tests for User model
├── user/
│   ├── dto/
│   │   ├── create-user.dto.ts # DTO for creating a user
│   │   └── update-user.dto.ts # DTO for updating a user (all fields optional)
│   ├── user.controller.ts     # HTTP route handlers
│   ├── user.interface.ts      # IUserService interface
│   ├── user.module.ts         # NestJS module declaration
│   ├── user.service.ts        # Business logic and lowdb persistence
│   └── user.service.spec.ts   # Unit tests for UserService
├── app.controller.ts          # Root health-check controller
├── app.module.ts              # Root application module
├── app.service.ts             # Root application service
└── main.ts                    # Application entry point
```

## Database

The app uses `lowdb` with a `db.json` flat file for persistence. The file is created automatically on first run and is excluded from version control via `.gitignore`.
