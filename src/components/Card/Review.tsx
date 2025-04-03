import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Review.module.scss';

interface CardReviewProps {
  fullName?: string;
  review?: ReactNode;
  stars: number;
  date: string;
}

export default function ReviewCard({ fullName, review, stars, date }: CardReviewProps) {
  return (
    <article className={classNames(styles.card)}>
      <div className={classNames(styles.card__info)}>
        {fullName && <h4>{fullName}</h4>}
        {review && <p>{review}</p>}
      </div>
      <div className={classNames(styles.card__footer)}>
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
