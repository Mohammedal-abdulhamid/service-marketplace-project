# Service Marketplace Platform

A comprehensive web-based marketplace that connects **service providers** and **service seekers** in one place. Unlike traditional service marketplaces that primarily allow providers to advertise their services, this platform enables **both providers and customers** to create listings. Service providers can showcase their skills and services, while service seekers can post their requirements and receive offers from qualified professionals.

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Database](#database)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

# Overview

The Service Marketplace Platform is a full-stack web application that connects individuals and businesses looking for services with professionals who provide them.

Unlike many existing marketplaces, which only allow providers to advertise their services, this platform creates a **two-way marketplace** where:

- Service providers can publish service listings.
- Service seekers can post service requests.
- Providers can respond to customer requests.
- Customers can browse available services.
- Both parties can communicate securely through the platform.

The system supports a wide range of service categories, making it suitable for freelancers, local businesses, tradespeople, consultants, and everyday service providers.

Examples include:

- Plumbing
- Electrical Services
- Home Cleaning
- Gardening
- Graphic Design
- Software Development
- Web Development
- Photography
- Tutoring
- Car Repairs
- Beauty Services
- Legal Services
- Healthcare
- Event Planning
- Moving Services

---

# Problem Statement

Many online service marketplaces only focus on service providers, requiring customers to search through listings manually.

This creates several problems:

- Customers cannot advertise their own service requirements.
- Providers miss opportunities because they cannot easily discover customer needs.
- Users often need multiple websites for different service categories.
- Finding the right match can be slow and inefficient.

This project solves these problems by creating a centralized marketplace where both providers and service seekers actively participate.

---

# Solution

The platform provides a complete marketplace where users can:

- Register an account.
- Create a profile.
- Offer services.
- Request services.
- Search listings.
- Filter results.
- Exchange messages.
- Leave reviews.
- Make secure online payments.

This creates a more efficient and balanced ecosystem for both providers and customers.

---

# Features

## User Authentication

- User registration
- Secure login
- JWT authentication
- Password hashing using bcrypt
- Role-based authorization

---

## User Profiles

- Profile management
- Contact information
- Profile picture
- Biography
- Skills
- Ratings
- Reviews

---

## Service Listings

Providers can:

- Create services
- Edit services
- Delete services
- Upload images
- Set prices
- Choose categories
- Manage availability

---

## Service Requests

Customers can:

- Post job requests
- Set budgets
- Choose preferred dates
- Specify locations
- Receive offers from providers

---

## Search & Filtering

Search using:

- Keywords
- Categories
- Price
- Rating
- Location
- Availability

---

## Messaging

- Direct messaging
- Notifications
- Booking discussions

---

## Reviews

- Star ratings
- Customer reviews
- Provider reputation

---

## Payments

- Stripe integration
- Secure payments
- Booking confirmation
- Payment history

---

## Admin Dashboard

Administrators can:

- Manage users
- Moderate listings
- Review reported content
- View platform statistics

---

# Technology Stack

## Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Axios

---

## Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Express Validator
- Multer
- dotenv
- CORS

---

## Database

- PostgreSQL

---

## Cloud & DevOps

- AWS EC2
- AWS RDS
- AWS S3
- Docker
- Terraform

---

## Payment

- Stripe API

---

## Version Control

- Git
- GitHub

---

# System Architecture

```text
                 +----------------------+
                 |      React App       |
                 |      Frontend        |
                 +----------+-----------+
                            |
                        HTTPS REST API
                            |
                 +----------+-----------+
                 |     Express.js API   |
                 |      Node.js         |
                 +----------+-----------+
                            |
              +-------------+-------------+
              |                           |
         PostgreSQL                  AWS S3 Storage
              |
          AWS RDS
```

---

# Project Structure

```text
service-marketplace/

├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── database/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── tests/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── terraform/
│
├── docker/
│
├── docs/
│
├── README.md
│
└── LICENSE
```

---

# Database

The application uses PostgreSQL.

Core tables include:

- Users
- Roles
- Services
- Service Requests
- Categories
- Messages
- Conversations
- Bookings
- Payments
- Reviews
- Notifications

Relationships:

- One user can create many service listings.
- One user can post many service requests.
- One booking links one customer with one provider.
- Reviews are linked to completed bookings.
- Payments are associated with bookings.

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/Mohammedal_abdulhamid/service-marketplace.git

cd service-marketplace
```

---

## Install Backend

```bash
cd backend

npm install
```

---

## Install Frontend

```bash
cd ../frontend

npm install
```

---


# Running the Application

## Backend

```bash
cd backend

npm run dev
```

or

```bash
npm start
```

Backend URL

```
http://localhost:4000
```

---

## Frontend

```bash
cd frontend

npm run dev
```

Frontend URL

```
http://localhost:3000
```

---

# API Endpoints

## Authentication

```
POST   /api/auth/register

POST   /api/auth/login

GET    /api/auth/profile
```

---

## Users

```
POST   /api/login

POST   /api/register 

GET  /api/profile
```

---

## Services

```
GET    /api/services

GET    /api/services/:id

POST   /api/services

PUT    /api/services/:id

DELETE /api/services/:id
```

---

## Service Requests

```
GET    /api/requests

GET    /api/requests/:id

POST   /api/requests

PUT    /api/requests/:id

DELETE /api/requests/:id
```

---

## Messages

```
GET    /api/messages

POST   /api/messages
```

---

## Payments

```
POST   /api/payments/create-checkout

POST   /api/payments/webhook
```

---

# Future Enhancements

Planned improvements include:

- Mobile applications (Android & iOS)
- AI-powered service recommendations
- AI chatbot support
- Voice search
- Calendar booking
- Video consultations
- Push notifications
- Email notifications
- SMS notifications
- Identity verification
- Escrow payment system
- Multi-language support
- Multi-currency support
- Subscription plans
- Analytics dashboard
- Fraud detection using machine learning

---

# Security

The platform follows modern security best practices.

- JWT authentication
- Password hashing with bcrypt
- Secure password storage
- Input validation
- Parameterized SQL queries
- CORS protection
- Environment variable management using dotenv
- HTTPS support
- Secure Stripe payment integration

---

# Contributing

Contributions are welcome.

1. Fork the repository.

2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to your branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

# License

This project is licensed under the MIT License.

---

# Author

**Mohammed Al-Abdulhamid**

Computer Science Student | Full-Stack Developer | Data Engineering Trainee

---

# Vision

To build an inclusive digital marketplace where anyone can easily **offer services**, **request services**, and connect with trusted professionals through a secure, user-friendly, and scalable platform.Ω
