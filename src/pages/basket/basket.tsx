import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductsFromCart, getPromoCode } from '../../store/app-slice/selectors';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { changeProductCountInBasket, setModalProductDeleteFromCart } from '../../store/app-slice/app-slice';
import Modal from '../../components/modal/modal';
import { ProductBasket } from '../../types';
import { capitalizeFirstLetter } from '../../utils/utils';
import { NAME_PHOTOCAMERA_FROM_SERVER, NAME_PHOTOCAMERA, ChangeProductCount, MAX_COUNT_PRODUCTS } from '../../const/const';
import BasketCount from '../../components/basket-count/basket-count';
import { setModalActive, setRemoveModalActive } from '../../store/modal-slice/modal-slice';
import PromoForm from '../../components/promo-form/promo-form';
import classNames from 'classnames';

function Basket(): JSX.Element {

  const dispatch = useAppDispatch();

  const products = useAppSelector(getProductsFromCart);

  const promocode = useAppSelector(getPromoCode);

  const price = products.reduce((prev, current) => prev + (current.price * current.count), 0);

  const [total, setTotal] = useState({
    price: price,
  });

  useEffect(() => {
    setTotal({
      price: price,
    });
  }, [price, products]);

  const discont = total.price * (promocode.discont / 100);

  const totalPrice = total.price - discont;

  function handleDeleteButtonClick(product: ProductBasket) {
    dispatch(setModalProductDeleteFromCart(product));
    dispatch(setModalActive(true));
    dispatch(setRemoveModalActive(true));
  }

  const handleIncreaseButtonClick = useCallback((id: ProductBasket['id']) => dispatch(changeProductCountInBasket({ type: ChangeProductCount.Increase, id })), [dispatch]);

  const handleDecreaseButtonClick = useCallback((id: ProductBasket['id']) => dispatch(changeProductCountInBasket({ type: ChangeProductCount.Decrease, id })), [dispatch]);

  const handleCountChange = useCallback((event: ChangeEvent<HTMLInputElement>, id: ProductBasket['id']) => {
    const value = Math.min(+event.target.value, MAX_COUNT_PRODUCTS);
    dispatch(changeProductCountInBasket({ id: id, count: value }));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header></Header>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <Breadcrumbs />
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {
                  products.map((product) => (
                    <li className="basket-item" key={product.id}>
                      <div className="basket-item__img">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}
                          />
                          <img
                            src={product.previewImg}
                            srcSet={`${product.previewImg2x} 2x`}
                            width={140}
                            height={120}
                            alt={product.name}
                          />
                        </picture>
                      </div>
                      <div className="basket-item__description">
                        <p className="basket-item__title">{product.name}</p>
                        <ul className="basket-item__list">
                          <li className="basket-item__list-item">
                            <span className="basket-item__article">Артикул:</span>{' '}
                            <span className="basket-item__number">{product.vendorCode}</span>
                          </li>
                          <li className="basket-item__list-item">
                            {product.type} {product.category === NAME_PHOTOCAMERA_FROM_SERVER ? capitalizeFirstLetter(NAME_PHOTOCAMERA) : capitalizeFirstLetter(product.category)}
                          </li>
                          <li className="basket-item__list-item">
                            {product.level} уровень
                          </li>
                        </ul>
                      </div>
                      <p className="basket-item__price">
                        <span className="visually-hidden">Цена:</span>{(product.price).toLocaleString()} ₽
                      </p>

                      <BasketCount product={product} onIncreaseClick={handleIncreaseButtonClick} onDecreaseClick={handleDecreaseButtonClick} onCountChange={handleCountChange} />

                      <div className="basket-item__total-price">
                        <span className="visually-hidden">Общая цена:</span>{(product.price * product.count).toLocaleString()} ₽
                      </div>
                      <button
                        className="cross-btn"
                        type="button"
                        aria-label="Удалить товар"
                        onClick={() => handleDeleteButtonClick(product)}
                      >
                        <svg width={10} height={10} aria-hidden="true">
                          <use xlinkHref="#icon-close" />
                        </svg>
                      </button>
                    </li>
                  ))
                }
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">
                    Если у вас есть промокод на скидку, примените его в этом поле
                  </p>
                  <div className="basket-form">
                    <PromoForm />
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{(total.price).toLocaleString()} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className={(classNames(
                      'basket__summary-value',
                      { 'basket__summary-value--bonus': Boolean(promocode.discont) }
                    ))}
                    >
                      {discont.toLocaleString()} ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                      К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {totalPrice.toLocaleString()} ₽
                    </span>
                  </p>
                  <button className="btn btn--purple" type="submit">
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Modal></Modal>

      <Footer></Footer>
    </div>

  );
}

export default Basket;
