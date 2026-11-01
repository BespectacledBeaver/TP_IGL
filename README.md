# TP_IGL

Full-stack project consisting of a **Django** backend (REST API) and a **React (Vite)** frontend for scientific article indexing and consultation.

> [!NOTE]
> This repository's visibility has been set to public temporarily for reviewer access, it will be privatized shortly.

---

## Project Structure

```text
TP_IGL/
├── FE_Seperated_Increments/   # React Frontend (Vite)
├── project/                   # Django Backend Project
│   ├── adminApp/              # Admin logic & PDF extraction
│   ├── articleManagementAPP/  # Article model & endpoints
│   ├── modAccount/            # Moderator authentication & review
│   ├── userManagementApp/     # User accounts & Favorites
│   └── searchApp/             # Search & Filtering
├── init_db.py                 # Standalone database initialization script
├── init-db.bat                # Database initialization runner (Windows)
├── init-db.sh                 # Database initialization runner (Linux/macOS)
├── start-backend.bat          # Start only the Django Backend (Windows)
├── start-frontend.bat         # Start only the React Frontend (Windows)
├── start-dev.bat              # Start both Backend and Frontend (Windows)
├── start-backend.sh          # Start only the Django Backend (Linux/macOS)
├── start-frontend.sh         # Start only the React Frontend (Linux/macOS)
├── start-dev.sh               # Start both Backend and Frontend (Linux/macOS)
└── README.md
```

---

## Database Initialization (PostgreSQL & SQLite)

A dedicated initialization script is provided so that any user or repo cloner can set up the database tables and seed realistic sample data (Users, Moderators, Research Articles, and Favorites) in one step:

- **Windows**:
  ```bat
  init-db.bat
  ```
- **Linux / macOS**:
  ```bash
  chmod +x *.sh
  ./init-db.sh
  ```
- **Cross-Platform Python command**:
  ```bash
  python init_db.py
  ```

### How Database Selection Works
- If PostgreSQL is running on `localhost:5432`, `init_db.py` creates the `project` database (if it doesn't already exist), runs all migrations, and seeds the initial tables.
- If PostgreSQL is not active, it gracefully initializes and seeds a local `db.sqlite3` file so the project is immediately usable without requiring a local database server setup.

### Initial Credentials Seeded
| Role | Username | Password | Notes |
| :--- | :--- | :--- | :--- |
| **Django Admin** | `admin` | `admin123` | Django `/admin` dashboard |
| **App Admin** | `admin` | `password123` | `Admin` model |
| **Moderator** | `moderator` | `modpass123` | Moderator login |
| **Moderator** | `john_mod` | `modpass123` | Secondary moderator |
| **App User** | `user1` | `userpass123` | Has pre-seeded favorite articles |
| **App User** | `student_user`| `student123`| Standard user account |

---

## Starting the Development Environments

### Option A: Using Startup Scripts
- **Windows**:
  - Run `start-backend.bat` to launch Django (`http://127.0.0.1:8000/`)
  - Run `start-frontend.bat` to launch React (`http://localhost:5173/`)
  - Or run `start-dev.bat` to launch both simultaneously in separate windows.
- **Linux / macOS**:
  - Run `./start-backend.sh`
  - Run `./start-frontend.sh`
  - Or run `./start-dev.sh`

---

## Manual Step-by-Step Run Tutorial (Terminal)

For users who prefer to run the services step-by-step through their terminal without executing automated scripts:

### Prerequisites

1. **Python**: Python 3.10+ installed ([python.org](https://www.python.org/downloads/)).
2. **Node.js & npm**: Node.js v18+ and npm installed ([nodejs.org](https://nodejs.org/)).
3. **PostgreSQL (Optional)**: If you wish to use PostgreSQL, ensure service is running on `localhost:5432` with a database named `project` (user `postgres`, password `tpigl6mhdi`). If not running, SQLite will automatically be used.

---

### Step 1: Initialize Database & Run Django Backend

Open your first terminal window and navigate to the project root:

1. **Navigate to the backend directory**:
   ```bash
   cd project
   ```

2. **Create and activate a virtual environment**:
   - On **Windows (PowerShell / CMD)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - On **Linux / macOS**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply database migrations (Creates all tables)**:
   ```bash
   python manage.py migrate
   ```

5. **Seed initial users, moderators, and articles**:
   ```bash
   python manage.py seed_db
   ```

6. **Start the Django development server**:
   ```bash
   python manage.py runserver
   ```
   The backend API will be live at: **`http://127.0.0.1:8000/`**

---

### Step 2: Set Up & Run the React Frontend

Open a **second terminal window** and navigate to the project root:

1. **Navigate to the frontend directory**:
   ```bash
   cd FE_Seperated_Increments
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   The React frontend will be live at: **`http://localhost:5173/`**

---

### Verifying the Setup

- Open [http://localhost:5173/](http://localhost:5173/) in your browser to view the React application.
- API requests from the frontend will be routed to the Django backend running on [http://127.0.0.1:8000/](http://127.0.0.1:8000/).
- To stop any running server, press `Ctrl + C` in its respective terminal window.
