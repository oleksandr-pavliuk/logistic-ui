import React from 'react'
import classNames from 'classnames'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import Button from '../Button'

export default function Navbar() {
  return (
    <header className={classNames(styles.navbar)}>
      <div className={classNames(styles.navbar__body)}>
        <div className='container'>
          <div className={classNames(styles.navbar__wrapper)}>
            <Link href={'/'}>Logistico</Link>
            <Button type='primary' href='/auth'>Login</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
