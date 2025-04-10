"use client"

import React, { useState } from "react";
import styles from './AuthPage.module.scss';
import classNames from "classnames";
import { useRouter } from 'next/navigation';
import Button from "@/components/Button";

// Define the User model
interface User {
  id: string;
  name: string;
}

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Call authentication API endpoint
      const response = await fetch('http://localhost:5185/api/user/login', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || 'Помилка авторизації');
      }

      // Store user data and authentication status in localStorage
      const userData: User = {
        id: data.id,
        name: data.name
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Трапилась помилка при вході');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.form)}>
        <h2>Вхід</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Електронна пошта"
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className={styles.input}
        />
        <Button 
          type="primary" 
          onClick={handleLogin} 
          disabled={isLoading}
        >
          {isLoading ? 'Завантаження ...' : 'Увійти'}
        </Button>
        <Button type="ghost" href="/">На головну</Button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Auth;