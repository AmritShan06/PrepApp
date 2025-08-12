'use client';

import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>PrepQuizzer</h1>
        <p className={styles.description}>
          Transform any PDF document into an interactive quiz in seconds. Our AI technology
          generates a set of multiple-choice questions from your study material, helping
          you prepare for exams and reinforce your knowledge efficiently. Get started now to
          unlock your learning potential and make studying more engaging.
        </p>
        <Link href="/signup" className={styles.getStartedButton}>
          Get Started
        </Link>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 PrepQuizzer. All rights reserved.</p>
      </footer>
    </div>
  );
}