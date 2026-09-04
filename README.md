# High Eagle — Ocean Slot Entertainment Platform

High Eagle is a modern, responsive, ocean-themed slot-game entertainment website built using **React**, **Django REST Framework**, and **MongoDB Atlas**. All games operate using virtual demo credits only — zero real money involved.

---

## 🏗️ Project Architecture

```text
React Frontend (Vite)
       │
       │ REST API / JSON (JWT Authorization)
       ▼
Django + Django REST Framework
       │
       ▼
MongoDB Atlas (via Djongo / MongoEngine)
```

---

## 📁 Project Structure

```text
slots-clone/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CategoryFilter/
│   │   │   ├── Footer/
│   │   │   ├── GameCard/
│   │   │   ├── GameGrid/
│   │   │   ├── Header/
│   │   │   ├── LoadingScreen/
│   │   │   ├── Modal/
│   │   │   ├── SearchBar/
│   │   │   ├── SkeletonCard/
│   │   │   └── SlotMachine/
│   │   ├── context/
│   │   ├── gameplay/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/
│   ├── config/          # Django settings & root URLs
│   ├── users/           # Auth, JWT, user profiles
│   ├── games/           # Catalog, categories, seed command
│   ├── gameplay/        # Server-side slot engine & history
│   ├── favorites/       # Favorite games persistence
│   ├── history/         # Recently played games
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

## 🌐 MongoDB Atlas Integration Guide (Step-by-Step for Beginners)

Follow these steps to connect your High Eagle platform to **MongoDB Atlas**:

1. **Sign Up / Log In**:
   - Go to [MongoDB Atlas Cloud](https://cloud.mongodb.com) and create a free account.

2. **Create a Free Cluster**:
   - Click **Deploy a Database**.
   - Select **M0 (Free Shared)** tier.
   - Choose your preferred cloud provider (AWS/GCP/Azure) and nearest region.
   - Click **Create**.

3. **Create Database Credentials**:
   - In the left sidebar, navigate to **Security → Database Access**.
   - Click **Add New Database User**.
   - Set Authentication Method to **Password**.
   - Username: `higheagle_admin`
   - Password: Autogenerate or create a strong password (save this password!).
   - Database User Privileges: Select **Read and write to any database** or **Atlas Admin**.
   - Click **Add User**.

4. **Configure IP Access**:
   - In the left sidebar, navigate to **Security → Network Access**.
   - Click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`) for development.
   - Click **Confirm**.

5. **Obtain Connection String**:
   - Go to **Database → Clusters** and click **Connect**.
   - Select **Drivers** (Python).
   - Copy the connection string format:
     ```text
     mongodb+srv://higheagle_admin:<password>@cluster0.xxxxx.mongodb.net/higheagle?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your database user password and specify `higheagle` as the database name.

6. **Add Connection String to `.env`**:
   - Open `backend/.env` (or create it from `.env.example`).
   - Set:
     ```env
     MONGODB_URI=mongodb+srv://higheagle_admin:YourPassword@cluster0.xxxxx.mongodb.net/higheagle?retryWrites=true&w=majority
     ```

---

## 🚀 Development Quick Start Guide

### Prerequisites
- **Python**: 3.10+
- **Node.js**: 18+ (LTS)
- **MongoDB Atlas** Account

---

### 💻 Windows Setup Commands

#### 1. Backend Setup (PowerShell / CMD)
```powershell
cd backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\Activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
Copy-Item .env.example .env

# Run database migrations
python manage.py makemigrations users games gameplay favorites history
python manage.py migrate

# Seed 20 fictional ocean slot games & 10 categories
python manage.py seed_games

# Start Django development server
python manage.py runserver
```

#### 2. Frontend Setup (PowerShell / CMD)
```powershell
cd frontend

# Install packages
npm install

# Create .env file
Copy-Item .env.example .env

# Start Vite dev server
npm run dev
```

Visit the app in your browser at `http://localhost:5173`.

---

### 🐧 macOS / Linux Setup Commands

#### 1. Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run migrations & seed data
python manage.py makemigrations users games gameplay favorites history
python manage.py migrate
python manage.py seed_games

# Start Django backend
python manage.py runserver
```

#### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start React dev server
npm run dev
```

---

## 🎮 Virtual Credits & Responsible Play

- Every user receives **10,000 Demo Coins** automatically upon registering.
- **No Cash Value**: Virtual coins cannot be purchased, deposited, withdrawn, or exchanged for money.
- **Fair Server Engine**: All slot spin outcomes are generated server-side using a weighted 20-payline RNG engine.

---

## 🛡️ Security Features

- **JWT Authentication**: Secure login using SimpleJWT with auto-refreshing access tokens.
- **Server-Side Validation**: All spin results and balance updates are computed on the backend — preventing client tampering.
- **CORS Protection**: Django CORS Headers restricted to authorized frontend origins.
- **Password Hashing**: Passwords stored using PBKDF2 algorithm.

---

## 🧪 Running Tests

### Backend Tests (Django)
```bash
cd backend
python manage.py test
```

### Frontend Build Test (Vite)
```bash
cd frontend
npm run build
```

---

## 📜 License & Originality Notice
High Eagle uses original branding, artwork concepts, and non-proprietary fictional slot game titles. Inspired by slot game lobbies for entertainment purposes only.
