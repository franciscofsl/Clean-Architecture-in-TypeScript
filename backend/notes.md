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