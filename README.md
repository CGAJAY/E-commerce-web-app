# eShop App

## Overview

Welcome to **eShop**, a modern e-commerce application for tech enthusiasts. Our platform is designed to provide a seamless shopping experience for customers while integrating cryptocurrency payments to minimize transaction fees.

---

## Key Features

- **Product Catalog**: Browse through a wide range of tech gadgets.
- **Cryptocurrency Payments**: Pay using Bitcoin, Ethereum, or other popular cryptocurrencies.
- **User Authentication**:
  - Secure signup and login process.
  - Email confirmation upon account creation.
- **Profile Management**:
  - Update profile photos.
  - Edit personal details.
- **State Management**:
  - Efficiently managed using Zustand.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Technology Stack

### Frontend

- **React.js**: For building interactive user interfaces.
- **Zustand**: State management.

### Backend

- **Node.js**: Server-side runtime.
- **Express.js**: Backend framework.
- **MongoDB**: Database for storing user and product data.
- **Mongoose**: ORM for MongoDB.

### Others

- **Multer**: For handling profile photo uploads.
- **Cookies**: For managing user session data.

---

## Key Functionalities

### Cryptocurrency Payments

To address high transfer fees from traditional payment systems, eShop supports cryptocurrency transactions. This integration is beginner-friendly and aims to make tech gadgets more accessible worldwide.

### User Signup Confirmation

Upon registration, users receive a confirmation email styled with a blue, white, and black color scheme. The email is modularized, making the email functionality reusable across the app.

### Profile Photo Management

- Existing profile photos are deleted when a user uploads a new one.
- Updated file names are stored in the database.

### State Management with Zustand

- Zustand checks cookies to validate user details and keeps the state synchronized on every page load.

---

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed.
- MongoDB server running locally or in the cloud.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/eshop.git
   ```
2. Navigate to the project directory:
   ```bash
   cd eshop
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   npm run server
   ```
2. Start the frontend:
   ```bash
   npm run client
   ```
3. Open the application in your browser at `http://localhost:3000`.

---

## Roadmap

- Add support for more cryptocurrencies.
- Implement advanced search and filtering for products.
- Introduce a subscription-based model for premium users.

---

## Contribution

We welcome contributions! Feel free to fork the repository and create pull requests. Ensure your code follows the project's guidelines and is thoroughly tested.

---

## License

This project is licensed under the MIT License.
