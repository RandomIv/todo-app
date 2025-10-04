
# Todo App
A simple and intuitive task management application that helps you organize your daily tasks with priority management and advanced filtering capabilities.

## 📋 Project Description
Todo App is a full-stack web application for creating, managing, and tracking your tasks. The application consists of a Next.js frontend and Node.js backend API with PostgreSQL database.

## ✨ Features
- 📝 Display a list of all tasks - View all your tasks in one organized list  
- ➕ Add a new task - Quickly create new tasks with a simple interface  
- 🗑️ Remove a task - Delete tasks you no longer need  
- 🔍 Search for tasks - Find specific tasks using the search functionality  
- ✅ Mark a task as done - Check off completed tasks to track your progress  
- 🎯 Filter tasks by status - View all tasks, only done, or only undone tasks  
- ⭐ Assign priority to tasks (1–10) - Set importance levels for better task management  
- 🔢 Sort tasks by priority - Order tasks in ascending or descending priority order  

## 🏗️ Architecture
- **Frontend:** Next.js application (Port 3000)  
- **Backend:** Node.js API with Express (Port 5000)  
- **Database:** PostgreSQL with Prisma ORM (Port 5432)  

## 🚀 Quick Start with Docker Compose

### Prerequisites
- Docker  
- Docker Compose  

### Installation & Running
Clone the repository:
```bash
git clone https://github.com/RandomIv/todo-app.git
cd todo-app
````

Set up environment files:

**For API (api/.env):**

```env
PORT=5000
DATABASE_URL="postgresql://myuser:mypassword@db:5432/mydb?schema=public"
```

**For Web (web/.env):**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start all services:

```bash
docker-compose up -d
```

Access the application:

* Web Frontend: [http://localhost:3000](http://localhost:3000)
* API Backend: [http://localhost:5000](http://localhost:5000)

## 🛠️ Manual Development Setup

### Prerequisites

* Node.js (v16+)
* PostgreSQL
* npm or yarn

### Backend Setup

Navigate to API directory:

```bash
cd api
```

Install dependencies:

```bash
npm install
```

Set up environment:

```bash
cp .env.example .env
# Edit .env with your database configuration
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the API:

```bash
npm run dev
```

### Frontend Setup

Navigate to Web directory:

```bash
cd web
```

Install dependencies:

```bash
npm install
```

Set up environment:

```bash
cp .env.example .env
# Edit .env with your API URL
```

Start the development server:

```bash
npm run dev
```

## ⚙️ Environment Configuration

**API Environment (api/.env):**

```env
PORT=5000
DATABASE_URL="postgresql://myuser:mypassword@db:5432/mydb?schema=public"
```

**Web Environment (web/.env):**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🐳 Docker Services

* **web:** Next.js frontend application (Port 3000)
* **api:** Node.js backend API with Prisma (Port 5000)
* **db:** PostgreSQL database (Port 5432)

## 📦 Project Structure

```
todo-app/
├── docker-compose.yml
├── web/                 # Next.js frontend
│   ├── .env
│   ├── package.json
│   └── src/
├── api/                 # Node.js backend
│   ├── .env
│   ├── package.json
│   ├── prisma/
│   └── src/
└── README.md
```

## 💻 Usage

**Adding a Task**

* Enter the task description in the input field
* Assign a priority level (1-10, where 10 is the highest priority)
* Click the "Add" button or press Enter

**Managing Tasks**

* Mark as Done: Click on the checkbox to mark as completed
* Remove Task: Click the delete button next to the task
* Search: Use the search bar to filter tasks by text
* Filter by Status: Use filter buttons to show all/done/undone tasks
* Sort by Priority: Toggle between ascending and descending order

## 🛠️ Technologies

* **Frontend:** Next.js, React, TypeScript
* **Backend:** Node.js, NestJS, Prisma ORM
* **Database:** PostgreSQL
* **Containerization:** Docker, Docker Compose


## 📝 License

This project is distributed under the MIT License.

## 👤 Author

**RandomIv**
GitHub: [@RandomIv](https://github.com/RandomIv)
