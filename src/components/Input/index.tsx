import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface InputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  link?: string;
}

export default function Input({ link, leftIcon, rightIcon, children }: InputProps) {
  return (
    <input />
  );
}
