# Budget Allocation Dashboard

This project is a full-stack application built with **Next.js** (frontend) and **Node.js with MongoDB** (backend) to manage and visualize company budget allocation data. It extracts data from a CSV file, stores it in MongoDB, and displays it in a user-friendly dashboard with bar charts.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Backend Schema](#backend-schema)
- [Data Structure](#data-structure)
- [User Roles and Access Levels](#user-roles-and-access-levels)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Features
- Import budget allocation data from a CSV file into MongoDB.
- Store metadata about processed files.
- Visualize budget data with interactive bar charts.
- RESTful API for data retrieval.
- Scalable backend with Mongoose schemas.

## Tech Stack
- **Frontend**: Next.js, React, `react-chartjs-2`, Chart.js
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Languages**: TypeScript
- **Tools**: Yarn, Git

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

## User Roles and Access Levels
*(Assumed based on typical use cases; adjust as needed)*

### Roles
1. **Admin**:
   - **Access**: Full access to all data and operations.
   - **Permissions**:
     - Import CSV files into the database.
     - View, edit, and delete budget records.
     - Manage file metadata in the `files` collection.
     - Access all charts and analytics.

2. **Viewer**:
   - **Access**: Read-only access to budget data.
   - **Permissions**:
     - View budget charts and summaries.
     - No ability to import, edit, or delete data.

### Access Levels
- **API Authentication**: Currently, no authentication is implemented. To enforce roles:
  - Add JWT or OAuth middleware to API routes (e.g., `/api/budget`).
  - Restrict `POST`/`PUT`/`DELETE` requests to Admins.
- **Frontend**: Role-based rendering can be added (e.g., hide import buttons for Viewers).

## Usage
1. **Import Data**:
   - Place the CSV file in `/files`.
   - Start the app with `yarn dev`. The backend will automatically process the CSV and store data in MongoDB if a matching `fileName` entry exists in the `files` collection.

2. **View Dashboard**:
   - Open `http://localhost:3000` in your browser to see the bar chart visualization of budget data.

3. **Add File Metadata (if needed)**:
   - Manually insert a document into the `files` collection to allow CSV processing:
     ```bash
     yarn ts-node -e 'require("./scripts/insertFile").insertFile()'
     ```
     Example script (`scripts/insertFile.ts`):
     ```typescript
     import mongoose from 'mongoose';
     import FileModel from '../models/file.schema';
     import { envConfig } from '../config/env.config';

     export const insertFile = async () => {
       await mongoose.connect(envConfig.databaseUrl);
       await FileModel.create({
         fileName: '/files/dataset_company_budget_allocation_dashboard.csv',
         extractedAt: new Date(),
       });
       console.log('File metadata inserted');
       await mongoose.connection.close();
     };

     insertFile();
     ```

## API Endpoints
- **GET `/api/budget`**:
  - **Description**: Fetch all budget records.
  - **Response**: Array of budget objects (see [Data Structure](#data-structure)).
  - **Status Codes**:
    - `200`: Success
    - `500`: Server error

## Frontend
- **Dashboard**: Located at `/` (root route).
- **Chart**: Displays a bar chart comparing `Allocated_Budget` and `Spent_Amount` by `Transaction_ID`.
- **Dependencies**:
  - `react-chartjs-2` and `chart.js` for chart rendering.
- **Customization**:
  - Edit `components/BarChart.tsx` to change chart type (e.g., Line, Pie) or data fields.

### Install Frontend Dependencies
```bash
yarn add chart.js react-chartjs-2
```

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Changes Made
- **Table of Contents**: Now uses proper Markdown syntax with `-` for list items and links directly to section headers using `#` anchors.
- **Yarn Commands**: All package management and run commands are updated for Yarn (e.g., `yarn install`, `yarn dev`).
- **Completeness**: Ensured all sections are fully populated and relevant to your project.

This README should now work as intended with a clickable Table of Contents in Markdown viewers (e.g., GitHub). Let me know if you need further refinements!