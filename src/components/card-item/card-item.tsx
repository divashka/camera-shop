import { Product } from '../../types';
import { Link } from 'react-router-dom';
import { AppRoute, RATE_COUNT } from '../../const/const';
import { setProductAddModalActive, setModalActive } from '../../store/modal-slice/modal-slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setModalProductFromCart } from '../../store/app-slice/app-slice';
import { getProductsFromCart } from '../../store/app-slice/selectors';

type CardItemProps = {
  product: Product;
}

function CardItem({ product }: CardItemProps): JSX.Element {

  const { id, name, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, rating, reviewCount, price } = product;

  const dispatch = useAppDispatch();

  const productsInCart = useAppSelector(getProductsFromCart);

  function handleAddButtonClick() {
    dispatch(setModalProductFromCart(product));
    dispatch(setModalActive(true));
    dispatch(setProductAddModalActive(true));
  }

  const isProductinCart = productsInCart.find((productCart) => product.id === productCart.id);

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
        {isProductinCart
          ?
          <Link className="btn btn--purple-border" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link>
          :
          <button className="btn btn--purple product-card__btn" type="button" onClick={handleAddButtonClick}>Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CardItem;
