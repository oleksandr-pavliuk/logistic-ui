import React from 'react'
import classNames from 'classnames'
import styles from './CTA.module.scss'
import Button from '../Button'

export default function CTA() {
  return (
    <div className={classNames(styles.cta)}>
      <div className={classNames(styles.cta__info)}>
        <h2 className={classNames(styles.cta__title)}>Доставляємо вантаж в будь яку точку світу</h2>
        <p className={classNames(styles.cta__description)}>Lorem ipsum dolor sit amet consectetur. Vitae tellus facilisi placerat non in quis</p>
      </div>
      <Button type='primary' href='mailto:7285358@stud.kai.edu.ua'>Замовити послугу</Button>
    </div>
  )
}
