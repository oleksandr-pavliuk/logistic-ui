import React from 'react'
import styles from './Footer.module.scss'
import classNames from 'classnames'

export default function Footer() {
  return (
    <footer className={classNames(styles.footer)}>
      <div className={classNames(styles.footer_body)}>
        <div className="container">
          <div className={classNames(styles.footer_body__wrapper)}>
            <div className={classNames(styles.col)}>
              <h4>Logistico</h4>
            </div>

            <div className={classNames(styles.col)}>
              <h4>Карта сайту</h4>
              <ul>
                <li><a href="">Головна</a></li>
                <li><a href="">Про нас</a></li>
                <li><a href="">Послуги</a></li>
              </ul>
            </div>

            <div className={classNames(styles.col)}>
              <h4>Карта сайту</h4>
              <ul>
                <li><a href="">Відгуки</a></li>
                <li><a href="">Новини</a></li>
                <li><a href="">Галерея</a></li>
              </ul>
            </div>

            <div className={classNames(styles.col)}>
              <h4>Контакти</h4>
              <ul>
                <li><a href="">+38-099-999-99-99</a></li>
                <li><a href="">+38-099-999-99-99</a></li>
                <li><a href="">logistico@gmail.com</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div className={classNames(styles.footer_bottom)}>
        <div className="container">
          <div className={classNames(styles.footer_bottom__wrapper)}>
            <p>© 2023 «Світ логістики». All rights reserved.</p>
            <a href="">Policy privacy</a>
            <a href="">Terms and conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
