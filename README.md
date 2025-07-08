# Clean Architecture in TypeScript

A **Clean Architecture** implementation in TypeScript, following Robert C. Martin's principles. This project demonstrates how to structure a backend application in a maintainable, testable, and scalable way.

## 🏗️ Architecture

This project implements Clean Architecture with the following layers:

```
src/
├── api/                    # 🌐 Presentation Layer (Controllers)
│   └── pirates/
│       └── PiratesController.ts
├── application/            # 📋 Application Layer (Use Cases)
│   └── pirates/
│       ├── CreatePirate.ts
│       └── GetAllPirates.ts
├── domain/                 # 🏛️ Domain Layer (Entities & Interfaces)
│   └── pirates/
│       ├── Pirate.ts
│       └── IPirateRepository.ts
└── infrastructure/         # 🔧 Infrastructure Layer (Repositories)
    └── pirates/
        └── PirateRepository.ts
```

## 🚀 Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **TypeScript** - Typed superset of JavaScript
- **Express.js** - Minimalist web framework
- **Jest** - Testing framework
- **ts-node-dev** - Development tool with hot reload

### DevOps & CI/CD
- **GitHub Actions** - CI/CD pipeline
- **Codecov** - Code coverage analysis
- **Docker** - Containerization (coming soon)

## 📋 Prerequisites

- **Node.js** >= 18.x
- **npm** >= 8.x

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/franciscofsl/Clean-Architecture-in-TypeScript.git
   cd Clean-Architecture-in-TypeScript
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

## 🚀 Available Commands

### Development
```bash
# Start server in development mode (with hot reload)
npm start

# Compile TypeScript
npm run build
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm test -- --coverage
```

### Production
```bash
# Compile for production
npm run build

# Start compiled server
node dist/index.js
```

## 🌐 API Endpoints

The server runs on `http://localhost:3000`

### Pirates API

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/pirates` | Get all pirates | - |
| `POST` | `/pirates` | Create a new pirate | `{ "name": "string" }` |

### Usage examples

```bash
# Get all pirates
curl http://localhost:3000/pirates

# Create a new pirate
curl -X POST http://localhost:3000/pirates \
  -H "Content-Type: application/json" \
  -d '{"name": "Monkey D. Luffy"}'
```

## 🧪 Testing

The project uses **Jest** for testing and maintains a minimum code coverage of **20%**. As this is a project to replicate C# knowledge, the focus is not on high coverage but on applying concepts.

### Test Structure
```
tests/
├── application/
│   └── pirates/
│       └── CreatePirates.test.ts
└── domain/
    └── pirates/
        └── Pirate.test.ts
```

### Run Tests
```bash
# Basic tests
npm test

# Tests with coverage
npm test -- --coverage

# Tests in watch mode (useful during development)
npm run test:watch
```

## 🔄 CI/CD Pipeline

The project includes a complete GitHub Actions pipeline:

### Workflow Includes:
- ✅ **Testing** on Node.js 18.x and 20.x
- ✅ **TypeScript compilation**
- ✅ **Code coverage** with Codecov
- ✅ **Build artifacts**
- ✅ **Dependency caching**

### Build Status
[![CI/CD Pipeline](https://github.com/franciscofsl/Clean-Architecture-in-TypeScript/actions/workflows/ci.yml/badge.svg)](https://github.com/franciscofsl/Clean-Architecture-in-TypeScript/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/franciscofsl/Clean-Architecture-in-TypeScript/branch/main/graph/badge.svg)](https://codecov.io/gh/franciscofsl/Clean-Architecture-in-TypeScript)

## 📁 Project Structure

```
Clean-Architecture-in-TypeScript/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline
├── backend/
│   ├── src/                    # Source code
│   ├── tests/                  # Unit tests
│   ├── coverage/               # Coverage reports
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
└── README.md                   # This file
```
