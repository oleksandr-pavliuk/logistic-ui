import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './News.module.scss';

interface CardNewsProps {
  fullName?: string;
  review?: ReactNode;
  stars: number;
  date: string;
}

export default function NewsCard({ fullName, review, stars, date }: CardNewsProps) {
  return (
    <article className={classNames(styles.card)}>
      {fullName && <h4>{fullName}</h4>}
      {review && <p>{review}</p>}
      <div className={classNames(styles.reviewFooter)}>
        <div className={classNames(styles.stars)}>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={classNames(styles.star, { [styles.filled]: index < stars })}
            ></div>
          ))}
        </div>
        <p className={classNames(styles.date)}>{date}</p>
      </div>
    </article>
  );
}
