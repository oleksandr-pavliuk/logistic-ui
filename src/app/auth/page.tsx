"use client"

import React, { useState } from "react";
import styles from './AuthPage.module.scss';
import classNames from "classnames";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Button from "@/components/Button";

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
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.form)}>
        <h2>Вход</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
        <Button type="primary" onClick={handleLogin}>Login</Button>
        <Button type="ghost" href="/">Back to home</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
      
    </>
  );
};

export default Auth;
