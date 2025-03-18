# Amazon Backend API

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" alt="Amazon Logo" width="200"/>
</p>

## Description

Backend API service for Amazon clone application. This service provides the necessary endpoints for user authentication, product management, and order processing.

## Associated Projects

- 📱 Mobile App Repository: [Amazon App Clone](https://github.com/HanyMedhat10/Amazon_App_Clone.git)

## Dependencies

```json
{
  "bcrypt": "^5.1.1",
  "bcryptjs": "^2.4.3",
  "config": "^3.3.12",
  "cros": "^1.0.1",
  "dotenv": "^16.4.5",
  "express": "^4.21.0",
  "http": "^0.0.1-security",
  "jsonwebtoken": "^9.0.2",
  "mongod": "^2.0.0",
  "mongoose": "^8.7.0"
}
```

## Development Dependencies

```json
{
  "nodemon": "^3.1.7"
}
```

## Features

- User Authentication
- Product Management
- Order Processing
- Admin Dashboard
- Cart Management

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with required environment variables
4. Run the development server:

   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start development server with nodemon
- `npm run start:debug`: Start server in debug mode
- `npm run start:dev`: Start server in watch mode

## API Base URL

```
/api
```

## Author

Hany Medhat

## License

ISC
