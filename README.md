Below is the updated README file with the live deployment links for the backend (`https://pulsebudget-server.onrender.com/`) and frontend (`https://pulsebudget-viewer.vercel.app/`), integrated into the appropriate sections. I've also ensured the document remains cohesive and complete.

---

### Updated README File

```markdown
# Budget Allocation Dashboard

This project is a full-stack application built with **Next.js** (frontend) and **Node.js with MongoDB** (backend) to manage and visualize company budget allocation data. It extracts data from a CSV file, stores it in MongoDB, and displays it in a user-friendly dashboard with bar charts. User authentication is implemented to restrict access based on roles.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Backend Schema](#backend-schema)
- [Data Structure](#data-structure)
- [User Roles and Access Levels](#user-roles-and-access-levels)
- [Authentication](#authentication)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Live Deployment](#live-deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- Import budget allocation data from a CSV file into MongoDB.
- Store metadata about processed files.
- Visualize budget data with interactive bar charts.
- Filter budget data by subsidiary and sector.
- RESTful API for data retrieval and user management.
- User authentication with role-based access (Admin and Viewer).
- Scalable backend with Mongoose schemas.

## Tech Stack
- **Frontend**: Next.js, React, `react-chartjs-2`, Chart.js
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Languages**: TypeScript
- **Tools**: Yarn, Git
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Yarn (v1.x or higher)
- Git

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/budget-allocation-dashboard.git
   cd budget-allocation-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add:
   ```
   DATABASE_URL=mongodb://localhost:27017/budget_db # or your MongoDB Atlas URL
   PORT=3000
   JWT_SECRET=your-secret-key # Replace with a secure key for JWT
   ```

4. **Prepare CSV File**:
   Place your CSV file (e.g., `dataset_company_budget_allocation_dashboard.csv`) in the `/files` directory. Ensure it has headers matching the `Budget` schema (see [Data Structure](#data-structure)).

5. **Run the Application**:
   ```bash
   yarn dev
   ```
   The app will start at `http://localhost:3000`.

## Backend Schema

### File Schema (`file.schema.ts`)
- **Purpose**: Tracks metadata about processed CSV files.
- **Fields**:
  - `fileName`: `String` (required) - Path or name of the CSV file.
  - `extractedAt`: `Date` (default: `Date.now`) - Timestamp of extraction.
  - `createdAt`: `Date` (auto-generated) - Creation timestamp.
  - `updatedAt`: `Date` (auto-generated) - Last update timestamp.
- **Collection**: `files`
- **Indexes**: Default `_id` index.

### Budget Schema (`budget.schema.ts`)
- **Purpose**: Stores budget allocation data extracted from the CSV.
- **Fields**:
  - `Transaction_ID`: `String` (required, unique) - Unique transaction identifier.
  - `Date`: `Date` (required) - Transaction date.
  - `Subsidiary`: `String` (required) - Company subsidiary.
  - `Sector`: `String` (required) - Business sector.
  - `User_ID`: `String` (required) - User responsible for the transaction.
  - `Allocated_Budget`: `Number` (required) - Budget allocated (formatted by `formateDecimal`).
  - `Spent_Amount`: `Number` (required) - Amount spent (formatted by `formateDecimal`).
  - `Remaining_Budget`: `Number` (required) - Remaining budget (formatted by `formateDecimal`).
  - `Revenue_Generated`: `Number` (required) - Revenue from the transaction (formatted by `formateDecimal`).
  - `Transaction_Type`: `String` (required) - Type of transaction (e.g., "Expense", "Investment").
  - `createdAt`: `Date` (auto-generated) - Creation timestamp.
  - `updatedAt`: `Date` (auto-generated) - Last update timestamp.
- **Collection**: `budgets`
- **Indexes**:
  - `Transaction_ID` (unique)
  - `Date` (ascending)

### User Schema (`user.schema.ts`)
- **Purpose**: Manages user authentication and roles.
- **Fields**:
  - `userName`: `String` (required) - User's name.
  - `email`: `String` (required, unique) - User's email address.
  - `password`: `String` (required) - Hashed password (using `hashPassword`).
  - `role`: `Enum` (default: `admin`) - User role (`viewer` or `admin`).
  - `createdAt`: `Date` (auto-generated) - Creation timestamp.
  - `updatedAt`: `Date` (auto-generated) - Last update timestamp.
- **Collection**: `users`
- **Indexes**: `email` (unique)

## Data Structure

### CSV File Format
The CSV file (`dataset_company_budget_allocation_dashboard.csv`) must have the following headers:
```
Transaction_ID,Date,Subsidiary,Sector,User_ID,Allocated_Budget,Spent_Amount,Remaining_Budget,Revenue_Generated,Transaction_Type
```
- Example row:
  ```
  T001,2023-01-15,TechCorp,IT,U123,1000.50,800.25,200.25,1500.75,Expense
  ```

### MongoDB Document Examples
- **File Collection**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439011",
    "fileName": "/files/dataset_company_budget_allocation_dashboard.csv",
    "extractedAt": "2025-04-03T12:00:00Z",
    "createdAt": "2025-04-03T12:00:00Z",
    "updatedAt": "2025-04-03T12:00:00Z"
  }
  ```
- **Budget Collection**:
  ```json
  {
    "_id": "507f191e810c19729de860ea",
    "Transaction_ID": "T001",
    "Date": "2023-01-15T00:00:00Z",
    "Subsidiary": "TechCorp",
    "Sector": "IT",
    "User_ID": "U123",
    "Allocated_Budget": 1000.50,
    "Spent_Amount": 800.25,
    "Remaining_Budget": 200.25,
    "Revenue_Generated": 1500.75,
    "Transaction_Type": "Expense",
    "createdAt": "2025-04-03T12:00:00Z",
    "updatedAt": "2025-04-03T12:00:00Z"
  }
  ```
- **User Collection**:
  ```json
  {
    "_id": "507f191e810c19729de860eb",
    "userName": "adminUser",
    "email": "admin@example.com",
    "password": "$2b$10$hashedpassword",
    "role": "admin",
    "createdAt": "2025-04-03T12:00:00Z",
    "updatedAt": "2025-04-03T12:00:00Z"
  }
  ```

## User Roles and Access Levels

### Roles
1. **Admin**:
   - **Access**: Full access to all data and operations.
   - **Permissions**:
     - Import CSV files into the database.
     - View, edit, and delete budget records.
     - Manage file metadata in the `files` collection.
     - Access all charts, filters, and transaction details.
2. **Viewer** (default for non-logged-in users):
   - **Access**: Read-only access to budget data.
   - **Permissions**:
     - View dashboard charts and summaries.
     - Apply filters to budget data.
     - No access to transaction details or data modification.

### Access Levels
- **API Authentication**: Uses JWT middleware:
  - Protected routes (e.g., `/dashboard`, `/filter`) require a valid token for full Admin access.
  - Unauthenticated requests default to Viewer mode with limited data.
- **Frontend**: Role-based rendering:
  - Logged-in users (Admins) see transaction details.
  - Non-logged-in users (Viewers) see only the homepage and filter options.

## Authentication
- **Process**:
  1. **User Creation**: Admins can create accounts via `/api/users/create` with `userName`, `email`, and `password`. Passwords are hashed using `bcrypt`.
  2. **Login**: Users log in via `/api/users/login` with `email` and `password`. A JWT token is returned if credentials are valid.
  3. **Role Check**:
     - If logged in (token present), the user is treated as an Admin and can access all features.
     - If not logged in (no token), the user is a Viewer with restricted access.
  4. **Token Verification**: Protected API routes use middleware to verify the JWT token.
- **Dependencies**:
  ```bash
  yarn add bcrypt jsonwebtoken
  yarn add -D @types/bcrypt @types/jsonwebtoken
  ```

## Usage
1. **Import Data**:
   - Place the CSV file in `/files`.
   - Start the app with `yarn dev`. The backend processes the CSV if a matching `fileName` entry exists in the `files` collection.

2. **User Management**:
   - Create an Admin user: `POST /api/users/create` with `{ "userName": "admin", "email": "admin@example.com", "password": "password123" }`.
   - Log in: `POST /api/users/login` with `{ "email": "admin@example.com", "password": "password123" }`.

3. **View Dashboard**:
   - Open `http://localhost:3000` (local) or [https://pulsebudget-viewer.vercel.app/](https://pulsebudget-viewer.vercel.app/) (live):
     - Without login: See charts and filters (Viewer mode).
     - With login: See charts, filters, and transaction details (Admin mode).

4. **Add File Metadata (if needed)**:
   - Run:
     ```bash
     yarn ts-node -e 'require("./scripts/insertFile").insertFile()'
     ```

## API Endpoints

### Budget Routes (`budget.route.ts`)
```typescript
import express from 'express';
import { budgetDataController, fieldsFindController, filteredBudgetDataController } from './budget.controller';
import { authMiddleware } from './auth.middleware';
const budgetRoute = express.Router();

budgetRoute.get('/dashboard', authMiddleware, budgetDataController);
budgetRoute.get('/filter', authMiddleware, filteredBudgetDataController);
budgetRoute.get('/fields', authMiddleware, fieldsFindController);

export default budgetRoute;
```
- **GET `/api/budget/dashboard`**:
  - Total budget and subsidiary-wise summary.
- **GET `/api/budget/filter`**:
  - Filtered data by `subsidiary` and/or `sector`.
- **GET `/api/budget/fields`**:
  - Returns unique values for filtering (e.g., all subsidiaries).

### User Routes (`user.route.ts`)
```typescript
import express from 'express';
import { userCreateController, userFindingController } from './user.controller';
const userRoutes = express.Router();

userRoutes.post('/create', userCreateController);
userRoutes.post('/login', userFindingController);

export default userRoutes;
```
- **POST `/api/users/create`**:
  - Creates a new user (Admin only in production).
- **POST `/api/users/login`**:
  - Authenticates and returns a JWT token.

## Frontend
- **Dashboard**: `/` (root route):
  - Viewer: Bar chart with `Allocated_Budget` vs `Spent_Amount`, filter options.
  - Admin: Adds transaction details table (e.g., `Transaction_ID`, `Date`, etc.).
- **Dependencies**:
  ```bash
  yarn add chart.js react-chartjs-2 axios
  ```
- **Live URL**: [https://pulsebudget-viewer.vercel.app/](https://pulsebudget-viewer.vercel.app/)

## Live Deployment
- **Backend**: Hosted on Render at [https://pulsebudget-server.onrender.com/](https://pulsebudget-server.onrender.com/)
  - Access API endpoints like `/api/budget/dashboard` and `/api/users/login`.
- **Frontend**: Hosted on Vercel at [https://pulsebudget-viewer.vercel.app/](https://pulsebudget-viewer.vercel.app/)
  - Displays the dashboard and interacts with the backend API.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```