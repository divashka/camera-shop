import { useEffect, useState, memo } from 'react';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import { getReviews } from '../../store/review-slice/selectors';
import { sortByDate } from '../../utils/utils';
import { Review } from '../../types';
import { REVIEWS_PER_COUNT, RATE_COUNT } from '../../const/const';
import { setModalActive, setReviewModalActive } from '../../store/app-slice/app-slice';

type ReviewsListProps = {
  id: number;
}

function ReviewsListComponent({ id }: ReviewsListProps): JSX.Element {

  const dispatch = useAppDispatch();

  const reviews = useAppSelector(getReviews);

  const reviewsSorted = reviews.slice().sort(sortByDate);

  const [shownReviews, setShownReviews] = useState(REVIEWS_PER_COUNT);

  let currentPerReviews: Review[] = [];

  currentPerReviews = reviewsSorted.slice(0, shownReviews);

  useEffect(() => {
    dispatch(fetchReviewsAction(Number(id)));
  }, [dispatch, id]);

  function handleLoadMoreClick() {
    setShownReviews(shownReviews + REVIEWS_PER_COUNT);
  }

  function handleReviewButtonClick() {
    dispatch(setModalActive(true));
    dispatch(setReviewModalActive(true));
  }

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              className="btn"
              type="button"
              onClick={handleReviewButtonClick}
            >
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {currentPerReviews.map((review) => (
              <li key={review.id} className="review-card">
                <div className="review-card__head">
                  <p className="title title--h4">{review.userName}</p>
                  <time className="review-card__data" dateTime="2022-04-13">
                    {dayjs(review.createAt).format('DD MMMM')}
                  </time>
                </div>
                <div className="rate review-card__rate">
                  {Array.from({ length: RATE_COUNT }, (_, index) => index).map((item) => (
                    <svg key={item} width="17" height="16" aria-hidden="true">
                      <use xlinkHref={item < review.rating ? '#icon-full-star' : '#icon-star'}></use>
                    </svg>
                  ))}
                  <p className="visually-hidden">Оценка: {review.rating}</p>
                </div>
                <ul className="review-card__list">
                  <li className="item-list">
                    <span className="item-list__title">Достоинства:</span>
                    <p className="item-list__text">
                      {review.advantage}
                    </p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Недостатки:</span>
                    <p className="item-list__text">
                      {review.disadvantage}
                    </p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Комментарий:</span>
                    <p className="item-list__text">
                      {review.review}
                    </p>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          {
            shownReviews < reviews.length &&
            <div className="review-block__buttons">
              <button
                className="btn btn--purple"
                type="button"
                onClick={handleLoadMoreClick}
              >
                Показать больше отзывов
              </button>
            </div>
          }
        </div>
      </section>
    </div>
  );
}

const ReviewsList = memo(ReviewsListComponent);

export default ReviewsList;
