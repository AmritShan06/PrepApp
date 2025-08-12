// app/signup/page.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';
import Link from 'next/link';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                router.push('/login');
            } else {
                setError(data.message || 'Failed to sign up.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <h1 className={styles.title}>Create an Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button type="submit" className={styles.button}>Sign Up</button>
                </form>
                <div className={styles.switchLink}>
                    <Link href="/login" className={styles.linkText}>
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;