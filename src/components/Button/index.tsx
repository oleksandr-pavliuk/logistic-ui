import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  link?: string;
}

export default function Button({ link, leftIcon, rightIcon, children }: ButtonProps) {
  return (
    <a href={link ? link : '#'} className={classNames(styles.btn)}>
      {leftIcon && <span className={classNames(styles.leftIcon)}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={classNames(styles.rightIcon)}>{rightIcon}</span>}
    </a>
  );
}
