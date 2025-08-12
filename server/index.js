// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import StudentModel from './models/Student.js';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/regitry')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const upload = multer({ storage: multer.memoryStorage() });

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    console.error("GEMINI_API_KEY is not set in the environment variables.");
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    StudentModel.create({ name, email, password })
    .then(user => {
        const token = jwt.sign({ name: user.name, email: user.email }, 'jwt-access-token-secret-key', {
            expiresIn: '1h'
        });
        
        res.json({ token: token, message: "User created and logged in successfully!" });
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to create user', details: err });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    StudentModel.findOne({ email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                const accessToken = jwt.sign({ name: user.name, email: user.email }, "jwt-access-token-secret-key", { expiresIn: '1h' });
                const refreshToken = jwt.sign({ name: user.name, email: user.email }, "jwt-refresh-token-secret-key", { expiresIn: '1d' });

                res.cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true });
                res.cookie('refreshToken', refreshToken, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });

                return res.json({ Login: true, token: accessToken, name: user.name });
            } else {
                res.json({ Login: false, message: "Invalid Password" });
            }
        } else {
            res.json({ Login: false, message: "User not found" });
        }
    })
    .catch(err => res.status(500).json(err));
});

app.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.json({ status: true });
});

app.post('/api/generate-questions', upload.single('file'), async (req, res) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ error: 'No file uploaded or file is empty.' });
    }
    
    try {
        const pdfData = await pdf(req.file.buffer);
        const textContent = pdfData.text;
        
        if (!textContent) {
          return res.status(400).json({ error: 'PDF contains no readable text.' });
        }

        const prompt = `Based on the following text from a PDF, generate as many unique question with all kinds multiple-choice questions (Each question should have 4 options (a, b, c, d) and indicate the correct answer) , fill in the blanks and long answer type. Format the output as a JSON array of objects, where each object has a 'question', 'options' (an array of strings), and an 'answer' key.
        
        Example format:
        [
          {
            "question": "What is the main topic of the document?",
            "options": ["History", "Science", "Mathematics", "Art"],
            "answer": "History"
          }
        ]
        
        Here is the text from the PDF:\n\n${textContent}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        let geminiText = response.text();

        const jsonMatch = geminiText.match(/```json\n([\s\S]*)\n```/);
        if (jsonMatch && jsonMatch[1]) {
            geminiText = jsonMatch[1];
        }
        
        let questions;
        try {
          questions = JSON.parse(geminiText);
        } catch (parseError) {
          console.error('Failed to parse Gemini response:', parseError);
          return res.status(500).json({ error: 'Invalid response format from AI model.' });
        }
        
        res.status(200).json({ questions });

    } catch (error) {
        console.error('Error in question generation:', error);
        res.status(500).json({ error: 'Failed to generate questions due to an internal server error.' });
    }
});

const verifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.json({ valid: false, message: "No refresh token" });
        }
        
        jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid refresh Token" });
            }
            const newAccessToken = jwt.sign({ email: decoded.email, name: decoded.name }, "jwt-access-token-secret-key", { expiresIn: '1h' });
            res.cookie('accessToken', newAccessToken, { maxAge: 60 * 60 * 1000, httpOnly: true });
            next();
        });
    } else {
        jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Token" });
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
};

app.get('/main', verifyUser, (req, res) => {
    return res.json({ valid: true, message: "authorised" });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
