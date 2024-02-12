import { Product } from '../../types';
import { Link } from 'react-router-dom';
import { AppRoute, RATE_COUNT } from '../../const/const';
import { setModalActive } from '../../store/app-slice/app-slice';
import { useAppDispatch } from '../../hooks';

type CardItemProps = {
  product: Product;
}

function CardItem({ product }: CardItemProps): JSX.Element {

  const { id, name, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, rating, reviewCount, price } = product;

  const dispatch = useAppDispatch();

  function handleBuyButtonClick() {
    dispatch(setModalActive());
  }

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}></source>
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280"
            height="240" alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {Array.from({ length: RATE_COUNT }, (_, index) => index).map((item) => (
            <svg key={item} width="17" height="16" aria-hidden="true">
              <use xlinkHref={item < rating ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={handleBuyButtonClick}>Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CardItem;
