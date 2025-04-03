import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React from 'react'
import classNames from 'classnames'
import styles from './HomePage.module.scss'
// import imageHeader from '../../assets/images/header.png'
import Image from 'next/image'
import Button from '@/components/Button'
import { ReviewCard, NewsCard } from '@/components/Card'
import CTA from '@/components/CTA'

const stats = [
  { value: "5000+", label: "виконаних замовлень" },
  { value: "5000+", label: "виконаних замовлень" },
  { value: "5000+", label: "виконаних замовлень" },
  { value: "5000+", label: "виконаних замовлень" },
];

const reviews = [
  { fullName: 'Анна Іваненко', review: 'Дуже задоволена сервісом!', stars: 5, date: '12.03.2024' },
  { fullName: 'Максим Петров', review: 'Швидко і якісно!', stars: 4, date: '10.03.2024' },
  { fullName: 'Олена Коваленко', review: 'Чудовий досвід, рекомендую!', stars: 5, date: '08.03.2024' },
  { fullName: 'Ігор Сидоренко', review: 'Все супер, але є нюанси.', stars: 3, date: '05.03.2024' }
];

// const news = [
//   { fullName: 'Анна Іваненко', review: 'Дуже задоволена сервісом!', stars: 5, date: '12.03.2024' },
//   { fullName: 'Максим Петров', review: 'Швидко і якісно!', stars: 4, date: '10.03.2024' },
//   { fullName: 'Олена Коваленко', review: 'Чудовий досвід, рекомендую!', stars: 5, date: '08.03.2024' },
//   { fullName: 'Ігор Сидоренко', review: 'Все супер, але є нюанси.', stars: 3, date: '05.03.2024' }
// ];

export default function Home() {
  return (
    <>
      <Navbar />
      <header className={classNames(styles.header)}>
        <div className="container">
          <div className={classNames(styles.header__wrapper)}>
            <h1>Ваш надійний перевізник</h1>
            <p>Lorem ipsum dolor sit amet consectetur. Vitae tellus facilisi placerat non in quis. Bibendum auctor quisque auctor quam hendrerit sagittis felis sit.</p>
          </div>
        </div>
        <div className="container__fluid">
          <div className={classNames(styles.header__image)}></div>
          {/* <Image src={imageHeader} alt="Image Header" loading="lazy"/> */}
        </div>
      </header>

      <main className={classNames(styles.main)}>

        <section className={classNames(styles.section_about)}>
          <div className="container">
            <div className={classNames(styles.section_about__wrapper)}>
              <div className={classNames(styles.section_about__info)}>
                <h2 className={classNames(styles.section_about__info__title)}>ПРО НАС</h2>
                <div className={classNames(styles.section_about__info__content)}>
                  <h3>Lorem ipsum dolor sit amet consectetur. Vitae tellus facilisi placerat non in quis. Bibendum auctor quisque auctor quam hendrerit sagittis felis sit.</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Vitae tellus facilisi placerat non in quis. Bibendum auctor quisque auctor quam hendrerit sagittis felis sit. Euismod at consectetur tellus eget enim urna odio. Volutpat nullam libero in dignissim nisi. Facilisi eu purus egestas vulputate dictumst. Interdum aliquam vitae tempus arcu etiam malesuada. A lacinia tellus tincidunt sollicitudin proin duis quam. Sem tristique pulvinar ut nisl fermentum eu bibendum sit. Egestas lobortis et faucibus ullamcorper interdum urna. Quis pulvinar nunc rutrum tortor ac.</p>
                  {/* <Image src={imageHeader} alt="Image Header" loading="lazy"/> */}
                </div>
              </div>
              <div className={classNames(styles.section_about__stats)}>
              {stats.map((stat, index) => (
                <article key={index} className={classNames(styles.section_about__card)}>
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section className={classNames(styles.section_reviews)}>
          <div className="container">
            <div className={classNames(styles.section_reviews__wrapper)}>
              
              <div className={classNames(styles.section_reviews__info)}>
                <h2 className={classNames(styles.section_reviews__info__title)}>Відгуки</h2>
                <p>Lorem ipsum dolor sit amet consectetur. Vitae tellus facilisi placerat non in quis</p>
              </div>
              <div className={classNames(styles.section_reviews__content)}>
                <div className={classNames(styles.section_reviews__content__cards)}>
                  {reviews.map((reviews, index) => (
                    <ReviewCard key={index} {...reviews} />
                  ))}
                </div>
                <Button>View More</Button>
              </div>

            </div>
          </div>
        </section>

        <section className={classNames(styles.section_cta)}>
          <div className="container">
            <CTA/>
          </div>
        </section>

        {/* <section className={classNames(styles.section_news)}>
          <div className="container">
            <div className={classNames(styles.section_news__wrapper)}>
              
              <div className={classNames(styles.section_news__info)}>
                <h2 className={classNames(styles.section_news__info__title)}>Новини</h2>
                <p>Lorem ipsum dolor sit amet consectetur. Vitae tellus facilisi placerat non in quis</p>
              </div>
              <div className={classNames(styles.section_news__content)}>
                <div className={classNames(styles.section_news__content__cards)}>
                  {news.map((news, index) => (
                    <NewsCard key={index} {...news} />
                  ))}
                </div>
                <Button>View More</Button>
              </div>

            </div>
          </div>
        </section> */}
      
      </main>
      <Footer />
    </>
  )
}
