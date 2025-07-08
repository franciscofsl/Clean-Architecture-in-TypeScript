# Clean Architecture in TypeScript - Backend Setup Guide

This document provides step-by-step instructions to replicate this Clean Architecture TypeScript backend project.

## 1. Initialize Root Folder

First, we initialize a new Node.js project and install the necessary dependencies:

```bash
npm init -y
npm install typescript ts-node-dev express
npm install --save-dev @types/node @types/express
npx tsc --init
```

**Explanation of each command:**
- `npm init -y`: Creates a package.json file with default values
- `npm install typescript ts-node-dev express`: Installs TypeScript compiler, development server with hot reload, and Express framework
- `npm install --save-dev @types/node @types/express`: Installs TypeScript type definitions for Node.js and Express (development dependencies)
- `npx tsc --init`: Creates a TypeScript configuration file (tsconfig.json)

## 2. Configure TypeScript

Edit the `tsconfig.json` file with the following configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

**Configuration explanation:**
- `target: "ES2020"`: Compiles TypeScript to ES2020 JavaScript
- `module: "CommonJS"`: Uses CommonJS module system (compatible with Node.js)
- `rootDir: "src"`: Sets the source code directory
- `outDir: "dist"`: Sets the output directory for compiled JavaScript
- `esModuleInterop: true`: Enables interoperability between CommonJS and ES modules
- `strict: true`: Enables all strict type checking options
- `skipLibCheck: true`: Skips type checking of declaration files for faster compilation

## 3. Testing Setup

Configure testing environment for the project by following these steps:

### 3.1. Install Testing Dependencies

Run the following commands in the backend root directory:

```bash
npm install -D jest ts-jest @types/jest
npx ts-jest config:init
npm install -D @vitest/expect @vitest/ui
```

**Explanation of each command:**
- `npm install -D jest ts-jest @types/jest`: Installs Jest testing framework, TypeScript integration for Jest, and Jest type definitions
- `npx ts-jest config:init`: Initializes Jest configuration for TypeScript projects (creates jest.config.js)
- `npm install -D @vitest/expect @vitest/ui`: Installs Vitest expect utilities and UI for enhanced testing experience

### 3.2. Configure Jest for Tests Directory

Update the `jest.config.js` file to specify where Jest should look for test files:

```javascript
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testMatch: [
    "**/tests/**/*.test.ts",
    "**/tests/**/*.spec.ts"
  ],
  transform: {
    ...tsJestTransformCfg,
  },
};
```

### 3.3. Update Package.json Scripts

Add the following test scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

**Script explanation:**
- `"test": "jest"`: Runs all tests once
- `"test:watch": "jest --watch"`: Runs tests in watch mode (re-runs tests when files change)

### 3.4. Directory Structure for Tests

Create your test files in a `tests` directory that mirrors your `src` structure:

```
tests/
  domain/
    YourEntity.test.ts
  application/
    YourUseCase.test.ts
  infrastructure/
    YourRepository.test.ts
```

Now you can run tests with:
- `npm test`: Run all tests once
- `npm run test:watch`: Run tests in watch mode

## 4. Writing Tests with Mocks

This section explains how to write unit tests using mocks for dependencies, which is essential for testing use cases in Clean Architecture.

### 4.1. Understanding Mocks

Mocks are fake implementations of dependencies that allow you to:
- Test your code in isolation
- Control the behavior of dependencies
- Verify that your code calls dependencies correctly
- Avoid side effects (like database operations) during testing

### 4.2. Basic Mock Structure

Here's a simple example of how to create tests with mocks for a use case:

```typescript
import { YourUseCase } from '../../../src/application/YourUseCase';
import { IYourRepository } from '../../../src/domain/IYourRepository';

describe('YourUseCase', () => {
  let useCase: YourUseCase;
  let mockRepository: jest.Mocked<IYourRepository>;

  beforeEach(() => {
    // Create mock of the repository
    mockRepository = {
      save: jest.fn(),
      getAll: jest.fn(),
      // Add all methods from your interface
    };

    // Create use case instance with the mock
    useCase = new YourUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should do something when called', async () => {
    // Arrange - Set up test data and mock behavior
    const testData = 'test value';
    mockRepository.save.mockResolvedValue();

    // Act - Execute the code being tested
    await useCase.execute(testData);

    // Assert - Verify the results
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ /* expected properties */ })
    );
  });
});
```

### 4.3. Key Mock Methods

- `jest.fn()`: Creates a mock function
- `mockFunction.mockResolvedValue(value)`: Makes the mock return a resolved promise with the given value
- `mockFunction.mockRejectedValue(error)`: Makes the mock return a rejected promise with the given error
- `expect(mockFunction).toHaveBeenCalledTimes(n)`: Verifies the mock was called n times
- `expect(mockFunction).toHaveBeenCalledWith(args)`: Verifies the mock was called with specific arguments

### 4.4. Test Structure (AAA Pattern)

Always structure your tests using the AAA pattern:
1. **Arrange**: Set up test data and configure mocks
2. **Act**: Execute the code being tested
3. **Assert**: Verify the expected behavior occurred

This approach ensures your tests are clear, maintainable, and reliable.

