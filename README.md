🌟 PrepApp: Your Modern Learning & Quiz Platform
PrepApp is a comprehensive web-based platform designed to transform the way students and learners prepare for exams. It provides a highly engaging and organized environment for knowledge acquisition, featuring interactive quizzes and a robust user management system. PrepApp's core mission is to make learning an efficient and rewarding experience by providing clear feedback and a path to mastery.

✨ Key Features
Interactive Quizzes: Challenge yourself with a wide range of quizzes on various subjects. Each quiz is designed to test understanding and reinforce key concepts.

Quiz PDF Download: After completing a quiz, you have the option to download the quiz as a PDF for offline review and future study.

Modern & Responsive UI: Experience a clean and intuitive design built with Next.js and React. The application provides a seamless and consistent experience across all devices, from desktops to mobile phones.

Secure Authentication: The application features a robust and secure user authentication system, including user registration and login, powered by Node.js and Express.js.

🚀 Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Ensure you have the following installed on your machine:

Node.js (v18 or higher)

npm (v8 or higher)

A running instance of MongoDB or a connection string from MongoDB Atlas.

Installation & Setup
Clone the repository to your local machine:

Bash

git clone https://github.com/AmritShan06/PrepApp.git
cd PrepApp
Install frontend dependencies:

Bash

npm install
Install backend dependencies:

Bash

cd server
npm install
cd ..
Configure your environment variables:
Create a .env file in the server directory and add the following keys, replacing the placeholders with your actual values:

MONGO_URI=<Your_MongoDB_Connection_String>
JWT_SECRET=<Your_Strong_Random_Secret_Key>
GEMINI_API_KEY="your_gemini_api_key_here"
Running the Application
Start the backend server in a new terminal:

Bash

cd server
npm start
Start the frontend development server in another terminal:

Bash

npm run dev
The application will now be live and accessible at http://localhost:3000.

📁 Project Structure
The project is structured with a separate frontend and backend for clear separation of concerns.

Frontend (prep/ directory)

prep/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── login/
│   │   ├── main/
│   │   └── signup/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
├── styles/
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
Backend (server/ directory)

server/
├── models/
├── node_modules/
├── index.js
├── package-lock.json
└── package.json
🤝 Contributing
Contributions are highly welcome! To contribute to PrepApp, please follow these guidelines:

Fork the repository.

Create a new branch for your feature or bug fix.

Commit your changes with a clear and descriptive message.

Push your changes to your forked repository.

Create a pull request, detailing the changes you've made.

📄 License
This project is licensed under the MIT License. See the LICENSE file for more details.

👨‍💻 Author
Amrit Shan - GitHub Profile
