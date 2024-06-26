
import { memo, useRef, useState } from 'react';
import classNames from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RATE_COUNT, AppRoute } from '../../const/const';
import { Product } from '../../types';
import './related-products.css';
import { Link } from 'react-router-dom';

type RelatedProductsProps = {
  products: Product[];
}

const PER_SLIDES_COUNT = 3;

function RelatedProductsComponent({ products }: RelatedProductsProps): JSX.Element {

  const customeSlider = useRef<Slider | null>(null);

  const [indexSlide, setIndexSlide] = useState(0);

  function afterChange(next: number) {
    setIndexSlide(next);
  }

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    afterChange: afterChange
  };

  function goToNext() {
    if (customeSlider.current) {
      customeSlider.current.slickNext();
    }
  }

  const goToPrev = () => {
    if (customeSlider.current) {
      customeSlider.current.slickPrev();
    }
  };

  function checkIsLastSlide() {
    return indexSlide === products.length - PER_SLIDES_COUNT;
  }
  function checkIsFirstSlide() {
    return indexSlide === 0;
  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>

          <div className="product-similar__slider">
            <Slider ref={customeSlider} {...settings} className="product-similar__slider-list">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={classNames(
                    'product-card'
                  )}
                >
                  <div className="product-card__img">
                    <picture>
                      <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}></source>
                      <img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width="280"
                        height="240" alt={product.name}
                      />
                    </picture>
                  </div>
                  <div className="product-card__info">
                    <div className="rate product-card__rate">
                      {Array.from({ length: RATE_COUNT }, (_, index) => index).map((item) => (
                        <svg key={item} width="17" height="16" aria-hidden="true">
                          <use xlinkHref={item < product.rating ? '#icon-full-star' : '#icon-star'}></use>
                        </svg>
                      ))}
                      <p className="visually-hidden">Рейтинг: {product.rating}</p>
                      <p className="rate__count">
                        <span className="visually-hidden">Всего оценок:</span>{product.reviewCount}
                      </p>
                    </div>
                    <p className="product-card__title">{product.name}</p>
                    <p className="product-card__price">
                      <span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <div className="product-card__buttons">
                    <button
                      className="btn btn--purple product-card__btn"
                      type="button"
                    >
                      Купить
                    </button>
                    <Link className="btn btn--transparent" to={`${AppRoute.Product}/${product.id}`}>Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
            <button
              className={classNames(
                'slider-controls slider-controls--prev',
                { 'slider-controls--points': checkIsFirstSlide()}
              )}
              type="button"
              aria-label="Предыдущий слайд"
              onClick={goToPrev}
              disabled={checkIsFirstSlide()}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              className={classNames(
                'slider-controls slider-controls--next',
                { 'slider-controls--points': checkIsLastSlide() }
              )}
              type="button"
              aria-label="Следующий слайд"
              onClick={goToNext}
              disabled={checkIsLastSlide()}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>

      </section >
    </div >
  );
}

const RelatedProducts = memo(RelatedProductsComponent);

export default RelatedProducts;
