# Notification Service

A microservice for handling notifications in the Job Platform application.

## Features

- Consumes events from RabbitMQ message queue
- Processes candidature creation and update events
- Stores notifications in MongoDB
- Provides REST API endpoints for notification management
- Authenticates users with JWT

## Events Handled

- `candidature.created`: Notifies recruiters when a new application is submitted
- `candidature.updated`: Notifies candidates when their application status changes

## API Endpoints

- `GET /api/notifications` - Get all notifications for authenticated user
- `GET /api/notifications/unread/count` - Get count of unread notifications
- `PUT /api/notifications/:id/read` - Mark a notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete a notification

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create `.env` file with necessary environment variables:
   ```
   PORT=5003
   MONGO_URI=mongodb://localhost:27017/job-platform-notifications
   RABBITMQ_URL=amqp://localhost
   JWT_SECRET=your_secret_key_here
   ```
4. Start the service:
   ```
   npm start
   ```

## Dependencies

- Express.js - Web framework
- MongoDB - Database
- Mongoose - MongoDB object modeling
- RabbitMQ - Message queue
- JSON Web Token - Authentication 