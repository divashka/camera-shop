import { memo, useEffect, Fragment, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { fetchAddReviewAction } from '../../store/api-actions';
import classNames from 'classnames';
import { RATING_TITLES, RATE_COUNT } from '../../const/const';
import { useAppSelector } from '../../hooks';
import { getStatusLoadingReview } from '../../store/review-slice/selectors';
import { FormInputsReview } from '../../types/modal';
import { getOneProduct } from '../../store/camera-slice/selectors';
import { setReviewModalActive, setSuccessReviewModalActive, setModalActive } from '../../store/modal-slice/modal-slice';
import ClosePopupButton from '../close-popup-button/close-popup-button';

function ProductReviewModalComponent(): JSX.Element {

  const [rating, setRating] = useState(0);

  const dispatch = useAppDispatch();

  const isLoadingReview = useAppSelector(getStatusLoadingReview);

  const product = useAppSelector(getOneProduct);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    watch,
    setFocus,
    reset
  } = useForm<FormInputsReview>({
    mode: 'onSubmit'
  });

  useEffect(() => {
    setTimeout(() => {
      setFocus('user-name');
    }, 300);
  }, [setFocus, dispatch]);

  function handleFormSubmit(data: FormInputsReview) {
    if (product) {
      dispatch(fetchAddReviewAction({
        cameraId: product.id,
        userName: data['user-name'],
        advantage: data['user-plus'],
        disadvantage: data['user-minus'],
        review: data['user-comment'],
        rating: Number(data.rating)
      })).unwrap().then(() => {
        reset();
        dispatch(setReviewModalActive(false));
        dispatch(setSuccessReviewModalActive(true));
      });
    }
  }

  function handleRatingChange() {
    setRating(watch('rating'));
  }

  const handleCloseButtonClick = useCallback(() => {
    dispatch(setModalActive(false));
    dispatch(setReviewModalActive(false));
  }, [dispatch]);

  return (
    <div className="modal__content"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          method="post"
          onSubmit={(event) =>
            void handleSubmit(handleFormSubmit)(event)}
        >
          <div className="form-review__rate">
            <fieldset
              className={classNames(
                'rate form-review__item',
                { 'is-invalid': errors.rating || false }
              )}
            >
              <legend className="rate__caption">
                Рейтинг
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  {Array.from({ length: RATE_COUNT }, (_, index: number) => ++index)
                    .reverse()
                    .map((item) => (
                      <Fragment key={`star-${item}`}>
                        <input
                          className="form__rating-input visually-hidden"
                          value={item}
                          id={`star-${item}`}
                          type="radio"
                          {...register('rating', {
                            required: 'Нужно оценить товар',
                            onChange: handleRatingChange,
                          })}
                        />
                        <label
                          htmlFor={`star-${item}`}
                          className="rate__label"
                          title={RATING_TITLES[item - 1]}
                        >
                        </label>
                      </Fragment>
                    ))}
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{rating}</span> <span>/</span>{ }
                  <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
            </fieldset>
            <div className={classNames(
              'custom-input form-review__item',
              { 'is-invalid': errors['user-name'] || false }
            )}
            >
              <label>
                <span className="custom-input__label">
                  Ваше имя
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  {...register('user-name', {
                    required: 'Нужно указать имя',
                    pattern: {
                      value: /[А-Яа-яЁёA-Za-z'-]{2,15}/,
                      message: 'Введите корректное имя'
                    }
                  })}
                />
              </label>
              <p className="custom-input__error">Нужно указать имя</p>
            </div>
            <div className={classNames(
              'custom-input form-review__item',
              { 'is-invalid': errors['user-plus'] || false }
            )}
            >
              <label>
                <span className="custom-input__label">
                  Достоинства
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Основные преимущества товара"
                  {...register('user-plus', {
                    required: 'Нужно указать достоинства',
                    maxLength: 160,
                    minLength: 10,
                  })}
                />
              </label>
              <p className="custom-input__error">Нужно указать достоинства</p>
            </div>
            <div className={classNames(
              'custom-input form-review__item',
              { 'is-invalid': errors['user-minus'] || false }
            )}
            >
              <label>
                <span className="custom-input__label">
                  Недостатки
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Главные недостатки товара"
                  {...register('user-minus', {
                    required: 'Нужно указать недостатки',
                    maxLength: 160,
                    minLength: 10,
                  })}
                />
              </label>
              <p className="custom-input__error">Нужно указать недостатки</p>
            </div>
            <div className={classNames(
              'custom-textarea form-review__item',
              { 'is-invalid': errors['user-comment'] || false }
            )}
            >
              <label>
                <span className="custom-textarea__label">
                  Комментарий
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <textarea
                  minLength={5}
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('user-comment', {
                    required: 'Нужно указать недостатки',
                    maxLength: 160,
                    minLength: 10,
                  })}
                />
              </label>
              <div className="custom-textarea__error">
                Нужно добавить комментарий
              </div>
            </div>
          </div>
          <button
            className="btn btn--purple form-review__btn"
            type="submit"
            disabled={isLoadingReview}
            aria-label="отправить отзыв"
          >
            Отправить отзыв
          </button>
        </form>
      </div>
      <ClosePopupButton onButtonCloseClick={handleCloseButtonClick} />
    </div>
  );
}
const ProductReviewModal = memo(ProductReviewModalComponent);

export default ProductReviewModal;
