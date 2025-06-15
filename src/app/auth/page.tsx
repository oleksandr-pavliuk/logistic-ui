"use client"

import React, { useState } from "react";
import styles from './AuthPage.module.scss';
import classNames from "classnames";
import { useRouter } from 'next/navigation';
import Button from "@/components/Button";

interface User {
  id: string;
  name: string;
}

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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

      const response = await fetch('http://localhost:5185/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Помилка авторизації');

      const userData: User = { id: data.id, name: data.name };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Трапилась помилка при вході');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('http://localhost:5185/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Помилка реєстрації');

      // Redirect to login
      setIsRegister(false);
      setEmail('');
      setPassword('');
      setName('');
      setError('Реєстрація успішна! Увійдіть в систему.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Трапилась помилка при реєстрації');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.form)}>
        <h2>{isRegister ? 'Створити' : 'Вхід'}</h2>

        {isRegister && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ім'я"
            className={styles.input}
          />
        )}

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
          onClick={isRegister ? handleRegister : handleLogin}
          disabled={isLoading}
        >
          {isLoading ? 'Завантаження ...' : isRegister ? 'Зареєструватися' : 'Увійти'}
        </Button>

        <Button type="ghost" href="/">На головну</Button>

        <p className={styles.switchMode}>
          {isRegister ? 'Вже маєте акаунт?' : 'Немає акаунту?'}{' '}
          <span onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? 'Увійдіть' : 'Зареєструйтесь'}
          </span>
        </p>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Auth;