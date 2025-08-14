# 🌟 PrepApp — Modern Quiz Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E=_18-brightgreen.svg)]()
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Repo Size](https://img.shields.io/github/repo-size/AmritShan06/PrepApp.svg)](https://github.com/AmritShan06/PrepApp)

PrepApp is a comprehensive web-based platform designed to transform the way students and learners prepare for exams. It provides a highly engaging and organized environment for knowledge acquisition, featuring interactive quizzes, quiz PDF downloads, and secure authentication. The goal is to make learning efficient, interactive, and rewarding.

---

## ✨ Key Features
- **Interactive Quizzes:** Test your knowledge with quizzes across multiple subjects.
- **Quiz PDF Download:** Export your quiz results as a PDF for offline review.
- **Modern & Responsive UI:** Built with Next.js and React for seamless experience.
- **Secure Authentication:** Powered by Node.js, Express.js, JWT, and MongoDB.
- **AI Integration:** Supports Gemini API for AI-based question generation.
- **Separation of Concerns:** Independent frontend and backend structure.

---

## 🔧 Prerequisites
- Node.js v18 or higher
- npm v8 or higher
- MongoDB (local or MongoDB Atlas)

---

## 📁 Project Structure
```
PrepApp/
├── prep/                  # Frontend (Next.js + React)
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/
│   │   │   ├── main/
│   │   │   └── signup/
│   │   ├── page.js
│   │   └── globals.css
│   ├── next.config.mjs
│   └── package.json
├── server/                # Backend (Node.js + Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── index.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/AmritShan06/PrepApp.git
cd PrepApp
```

### Install frontend dependencies
```bash
cd prep
npm install
```

### Install backend dependencies
```bash
cd ../server
npm install
```

### Configure environment variables
Create `.env` inside `server/`:
```env
MONGO_URI="your_mongo_db_url"
JWT_SECRET="your_strong_jwt_secret"
GEMINI_API_KEY="your_gemini_api_key_here"
PORT=5000
```

### Start backend
```bash
cd server
npm start
```

### Start frontend
```bash
cd ../prep
npm run dev
```

Visit the application at:  
**Frontend:** http://localhost:3000  
**Backend:** http://localhost:5000

---

## 🧭 API Endpoints (Example)

**Auth**
```http
POST /api/auth/register   # Register new user
POST /api/auth/login      # Login and receive token
```

**Quizzes**
```http
GET /api/quizzes          # Fetch all quizzes
POST /api/quizzes         # Create a quiz (admin only)
```

**Gemini Integration**
- Requires `GEMINI_API_KEY` in `.env` to enable AI-generated question creation from uploaded PDFs.

---

## 🤝 Contributing
```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/YourFeature
# Commit changes
git commit -m "feat: add YourFeature"
# Push to branch
git push origin feature/YourFeature
# Open a Pull Request
```

---

## 📜 License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file.

---

## 👨‍💻 Author
**Amrit Shan** — [GitHub Profile](https://github.com/AmritShan06)
