import { useParams, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
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
import { TabsName, RATE_COUNT } from '../../const/const';
import RelatedProducts from '../../components/related-products/related-products';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ButtonScrollUp from '../../components/button-scroll-up/button-scroll-up';
import Modal from '../../components/modal/modal';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { setModalProductFromCart } from '../../store/app-slice/app-slice';
import { setModalActive, setProductAddModalActive } from '../../store/modal-slice/modal-slice';

function Product(): JSX.Element {

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [activeTabParams, setActiveTabParams] = useSearchParams();

  const handleTabButtonClick = useCallback((type: TabType) => setActiveTabParams({ tab: type }), [setActiveTabParams]);

  const currentTab = activeTabParams.get('tab') as TabType || TabsName.Description;

  const product = useAppSelector(getOneProduct);
  const isLoading = useAppSelector(getLoadingOneProductStatus);

  const relatedProducts = useAppSelector(getRelatedProducts);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOneProductAction(Number(id)));
    dispatch(fetchRelatedProductsAction(Number(id)));

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

  function handleAddToCart() {
    if (product) {
      dispatch(setModalProductFromCart(product));
    }
    dispatch(setModalActive(true));
    dispatch(setProductAddModalActive(true));
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
              <Breadcrumbs />
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
                    {Array.from({ length: RATE_COUNT }, (_, index) => index).map((item) => (
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
                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={handleAddToCart}
                  >
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

          <ReviewsList id={Number(id)} ></ReviewsList>
        </div>
      </main>

      <ButtonScrollUp></ButtonScrollUp>

      <Modal />

      <Footer></Footer>
    </div>
  );
}

export default Product;
