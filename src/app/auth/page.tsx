"use client"

import React, { useState } from "react";
import styles from './AuthPage.module.scss';
import classNames from "classnames";
import { useRouter } from 'next/navigation';

const Auth = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const adminPassword = 'admin123';

  const handleLogin = () => {
    if (password === adminPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <>
      <div className={classNames(styles.navbar)}>
        <a href="/">Logo</a>
      </div>
      
      <div className={classNames(styles.wrapper)}>
        <h2>Вход</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
        <button className={classNames(styles.button)} onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
};

export default Auth;
