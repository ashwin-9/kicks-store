# Kicks Store - PERN Stack E-commerce Application

## Description
A modern web application for sneaker enthusiasts, built using the PERN (PostgreSQL, Express, React, Node.js) stack. Browse to keep track of the sneakers in the inventory!

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features
- Full-stack JavaScript application with modern architecture
- RESTful API backend with comprehensive error handling
- Advanced security with rate limiting and bot detection using Arcjet
- Responsive and intuitive UI built with React and DaisyUI
- Real-time notifications using React Hot Toast
- Global state management with Zustand
- PostgreSQL database integration for reliable data storage
- Frontend Pagination

## Prerequisites
- Node.js (v14.0.0 or higher)
- PostgreSQL (v12.0 or higher)
- npm

## Installation

### Clone the repository
```bash
git clone https://github.com/ashwin-9/kicks-store.git
cd kicks-store
```

### Install backend dependencies
```bash
npm install
```

### Install frontend dependencies
```bash
cd frontend
npm install
```

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGHOST=your_database_host
PGDATABASE=your_database_name
ARCJET_KEY=your_arcjet_key
PORT=3000
```

## Running the Application

### Start the backend from the root directory
```bash
npm run dev
```

### Start the frontend
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure
```
├── backend/              # Express backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── lib/              # Library (arcjet) files
│   ├── routes/           # API routes
│   ├── seeds/            # Database seeder file
│   └── server.js         # Server
|
├── frontend/             # React frontend
│   ├── public/           # Public assets
│   ├── src/              # Source files
│   │   ├── components/   # React components
│   │   ├── constants/    # Theme Constants
│   │   ├── pages/        # Page components
│   │   ├── store/        # Global state management with Zustand
│   │   └── App.jsx       # Main application component
│   │   └── index.css     # Global styles
│   │   └── main.jsx      # Application entry point
│   └── package.json      # Frontend dependencies
│
└── package.json          # Backend dependencies
│
└── README.md             # Project documentation
```

## API Documentation
### Base URL
`http://localhost:3000/api`

### Endpoints
#### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Database
### Schema
```sql
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment
The application is deployed on Render. Follow these steps to deploy:

1. Create a new Web Service on Render
2. Link your GitHub repository
3. Configure build settings:
   - Build Command: `npm install && cd frontend && npm install && npm run build`
   - Start Command: `npm start`
4. Add environment variables in Render dashboard
5. Deploy and monitor the build process

## Technologies Used
### Backend
- Node.js
- Express.js
- PostgreSQL
- Arcjet for rate limiting and bot detection
- Morgan for request logging
- Helmet for enhanced security headers

### Frontend
- React 19
- React Router Dom v7
- Axios for API requests
- Lucide React for icons
- Zustand for state management
- DaisyUI & Tailwind CSS for styling
- React Hot Toast for notifications

### Development Tools
- Git for version control
- npm for package management
- nodemon for development hot-reloading
- ESLint & Prettier for code formatting

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request