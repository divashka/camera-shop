import { useParams, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { fetchOneProductAction, fetchRelatedProductsAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import { getOneProduct, getLoadingOneProductStatus, getRelatedProducts } from '../../store/camera-slice/selectors';
import { useAppDispatch } from '../../hooks';
import { dropProduct } from '../../store/camera-slice/camera-slice';
import NotFound from '../not-found/not-found';
import Loading from '../loading/loading';
import ProductTabs from '../../components/product-tabs/product-tabs';
import { TabType } from '../../types';
import { TabsName } from '../../const/const';
import RelatedProducts from '../../components/related-products/related-products';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ButtonScrollUp from '../../components/button-scroll-up/button-scroll-up';
import Modal from '../../components/modal/modal';
import ClosePopupButton from '../../components/close-popup-button/close-popup-button';

function Product(): JSX.Element {

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const focusElement = useRef<HTMLInputElement | null>(null);

  const [activeTabParams, setActiveTabParams] = useSearchParams();

  const handleTabButtonClick = useCallback((type: TabType) => setActiveTabParams({ tab: type }), [setActiveTabParams]);

  const currentTab = activeTabParams.get('tab') as TabType || TabsName.Description;

  const product = useAppSelector(getOneProduct);
  const isLoading = useAppSelector(getLoadingOneProductStatus);

  const relatedProducts = useAppSelector(getRelatedProducts);

  // const handleElementFocus = useCallback(() => {
  //   if (focusElement.current) {
  //     focusElement.current.focus();
  //   }
  // }, []);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOneProductAction(id));
    dispatch(fetchRelatedProductsAction(id));

    return () => {
      dispatch(dropProduct());
    };
  }, [id, dispatch]);

  if (!product && isLoading) {
    return <Loading />;
  }

  if (!product || !id) {
    return <NotFound />;
  }

  const { name, type, category, vendorCode, level, description, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = product;

  const features = { type, category, vendorCode, level };

  return (
    <div className="wrapper">
      <Header></Header>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">
                    Каталог
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    {name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
                    />
                    <img
                      src={previewImg}
                      srcSet={`${previewImg2x} 2x`}
                      width={560}
                      height={480}
                      alt={name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    {Array.from({ length: 5 }, (_, index) => index).map((item) => (
                      <svg key={item} width="17" height="16" aria-hidden="true">
                        <use xlinkHref={item < rating ? '#icon-full-star' : '#icon-star'}></use>
                      </svg>
                    ))}
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>{reviewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>
                    Добавить в корзину
                  </button>

                  <ProductTabs onTabButtonClick={handleTabButtonClick} currentTab={currentTab} features={features} description={description}></ProductTabs>

                </div>
              </div>
            </section>
          </div>

          {relatedProducts.length !== 0 && <RelatedProducts products={relatedProducts}></RelatedProducts>}

          <ReviewsList id={id} focusElement={focusElement}></ReviewsList>
        </div>
      </main>

      <ButtonScrollUp></ButtonScrollUp>

      <Modal>
        <p className="title title--h4">Оставить отзыв</p>
        <div className="form-review">
          <form method="post">
            <div className="form-review__rate">
              <fieldset className="rate form-review__item">
                <legend className="rate__caption">
                  Рейтинг
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </legend>
                <div className="rate__bar">
                  <div className="rate__group">
                    <input
                      className="visually-hidden"
                      id="star-5"
                      name="rate"
                      type="radio"
                      defaultValue={5}
                    />
                    <label
                      className="rate__label"
                      htmlFor="star-5"
                      title="Отлично"
                    />
                    <input
                      className="visually-hidden"
                      id="star-4"
                      name="rate"
                      type="radio"
                      defaultValue={4}
                    />
                    <label
                      className="rate__label"
                      htmlFor="star-4"
                      title="Хорошо"
                    />
                    <input
                      className="visually-hidden"
                      id="star-3"
                      name="rate"
                      type="radio"
                      defaultValue={3}
                    />
                    <label
                      className="rate__label"
                      htmlFor="star-3"
                      title="Нормально"
                    />
                    <input
                      className="visually-hidden"
                      id="star-2"
                      name="rate"
                      type="radio"
                      defaultValue={2}
                    />
                    <label
                      className="rate__label"
                      htmlFor="star-2"
                      title="Плохо"
                    />
                    <input
                      className="visually-hidden"
                      id="star-1"
                      name="rate"
                      type="radio"
                      defaultValue={1}
                    />
                    <label
                      className="rate__label"
                      htmlFor="star-1"
                      title="Ужасно"
                    />
                  </div>
                  <div className="rate__progress">
                    <span className="rate__stars">0</span> <span>/</span>{ }
                    <span className="rate__all-stars">5</span>
                  </div>
                </div>
                <p className="rate__message">Нужно оценить товар</p>
              </fieldset>
              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Ваше имя
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    ref={focusElement}
                    type="text"
                    name="user-name"
                    placeholder="Введите ваше имя"
                    required
                  />
                </label>
                <p className="custom-input__error">Нужно указать имя</p>
              </div>
              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Достоинства
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="user-plus"
                    placeholder="Основные преимущества товара"
                    required
                  />
                </label>
                <p className="custom-input__error">Нужно указать достоинства</p>
              </div>
              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Недостатки
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="user-minus"
                    placeholder="Главные недостатки товара"
                    required
                  />
                </label>
                <p className="custom-input__error">Нужно указать недостатки</p>
              </div>
              <div className="custom-textarea form-review__item">
                <label>
                  <span className="custom-textarea__label">
                    Комментарий
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <textarea
                    name="user-comment"
                    minLength={5}
                    placeholder="Поделитесь своим опытом покупки"
                  />
                </label>
                <div className="custom-textarea__error">
                  Нужно добавить комментарий
                </div>
              </div>
            </div>
            <button className="btn btn--purple form-review__btn" type="submit">
              Отправить отзыв
            </button>
          </form>
        </div>

        <ClosePopupButton></ClosePopupButton>
      </Modal>

      <Footer></Footer>
    </div>
  );
}

export default Product;
