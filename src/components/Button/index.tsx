import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import Link from 'next/link';

interface ButtonProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  href?: string;
  block?: boolean;
  type?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void
}

export default function Button({
  href,
  leftIcon,
  rightIcon,
  type,
  block,
  children,
  onClick,
}: ButtonProps) {
  if (onClick) {
    return (
      <button
        className={classNames(styles.btn, block && styles.btn__block, type && styles[`btn_${type}`])}
        onClick={onClick}
      >
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </button>
    );
  }

  return (
    <Link href={href ?? '#'} className={classNames(styles.btn, block && styles.btn__block, type && styles[`btn_${type}`])}>
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </Link>
  );
}
