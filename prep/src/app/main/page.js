'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../page.module.css';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setUsername] = useState('Loading...');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        
        if (decodedToken && decodedToken.name) {
          setUsername(decodedToken.name);
        } else {
          setUsername('Guest');
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem('token');
        setUsername('Guest');
      }
    } else {
      setUsername('Guest');
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
    setGeneratedQuestions([]);
    setError(null);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3001/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Failed to log out on the server:', error);
    }
    
    localStorage.removeItem('token');
    setUsername('Guest');
    if (router.push) {
        router.push('/login');
    }
  };

  const handleGenerateQuestions = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:3001/api/generate-questions', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data from backend:', data); 

      if (data.questions && Array.isArray(data.questions)) {
        setGeneratedQuestions(data.questions);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error('Error generating questions:', err);
      setGeneratedQuestions([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>PrepQuizzer - Upload PDF</title>
        <meta name="description" content="Upload your PDF to generate quiz questions" />
      </Head>

      <div className={styles.appContainer}>
        <header className={styles.header}>
          <div className={styles.logo}>PrepQuizzer</div>
          <div className={styles.headerRight}>
            <span className={styles.username}>{name}</span>
            <div className={styles.hamburgerMenu}>
              <button
                className={styles.hamburgerButton}
                onClick={toggleMenu}
                aria-label="Open menu"
              >
                <div className={styles.hamburgerIcon}>
                  <div className={styles.hamburgerLine}></div>
                  <div className={styles.hamburgerLine}></div>
                  <div className={styles.hamburgerLine}></div>
                </div>
              </button>
              <div className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ''}`}>
                <button
                  className={styles.logoutButton}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>Upload Your PDF</h1>
          <div className={styles.mainContentGrid}>
            <div className={styles.uploadSection}>
              <div className={styles.pdfUploadArea}>
                <div className={styles.uploadIcon}>📄</div>
                <h3 className={styles.uploadTitle}>
                  {selectedFile ? selectedFile.name : 'Choose PDF File'}
                </h3>
                <p className={styles.uploadDescription}>
                  Upload your PDF document to generate quiz questions
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className={styles.fileInput}
                  id="pdf-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="pdf-upload">
                  <button
                    className={styles.uploadButton}
                    type="button"
                    onClick={() => document.getElementById('pdf-upload')?.click()}
                  >
                    {selectedFile ? 'Change File' : 'Browse Files'}
                  </button>
                </label>
                <p className={styles.fileTypes}>
                  Supported formats: PDF (Max size: 10MB)
                </p>
                {selectedFile && (
                  <button
                    className={styles.generateButton}
                    onClick={handleGenerateQuestions}
                    disabled={loading}
                  >
                    {loading ? 'Generating...' : 'Generate Questions'}
                  </button>
                )}
              </div>
            </div>

            <div className={styles.questionsSection}>
              {loading && <p className={styles.loadingMessage}>Generating questions...</p>}
              {error && <p className={styles.errorMessage}>Error: {error}</p>}
              {!loading && !error && generatedQuestions.length > 0 ? (
                <div className={styles.questionList}>
                  {generatedQuestions.map((q, index) => (
                    <div key={index} className={styles.questionCard}>
                      <p className={styles.questionText}>
                        <strong>{index + 1}.</strong> {q.question}
                      </p>
                      <ul className={styles.optionsList}>
                        {q.options.map((option, optionIndex) => (
                          <li key={optionIndex} className={styles.optionItem}>
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && !error && <p className={styles.noQuestionsMessage}>
                  Questions will appear here after you upload a PDF and generate them.
                </p>
              )}
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.copyright}>
            © 2026 <span className={styles.companyName}>PrepQuizzer</span> | All rights reserved
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainPage;