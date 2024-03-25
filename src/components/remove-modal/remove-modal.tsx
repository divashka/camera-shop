import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteFromCart, setModalActive, setRemoveModalActive, setSuccessRemoveModalActive } from '../../store/app-slice/app-slice';
import { getDeleteProductFromCart } from '../../store/app-slice/selectors';
import NotFound from '../../pages/not-found/not-found';
import { capitalizeFirstLetter } from '../../utils/utils';
import ClosePopupButton from '../close-popup-button/close-popup-button';

function ProductRemoveModalComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  const product = useAppSelector(getDeleteProductFromCart);

  const handleCloseButtonClick = useCallback(() => {
    dispatch(setModalActive(false));
    dispatch(setRemoveModalActive(false));
  }, [dispatch]);

  if (!product) {
    return <NotFound />;
  }

  function handleDeleteButtonClick() {
    if (product) {
      dispatch(deleteFromCart(product));
    }
    dispatch(setRemoveModalActive(false));
    dispatch(setSuccessRemoveModalActive(true));
  }

  function handleCatalogClick() {
    dispatch(setModalActive(false));
    dispatch(setRemoveModalActive(false));
  }

  const { vendorCode, name, type, level, category, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x } = product;

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
                />
                <img
                  src={previewImg}
                  srcSet={`${previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{ }
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type} {capitalizeFirstLetter(category)}</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              onClick={handleDeleteButtonClick}
            >
              Удалить
            </button>
            <Link
              className="btn btn--transparent modal__btn modal__btn--half-width"
              to={AppRoute.Root}
              onClick={handleCatalogClick}
            >
              Продолжить покупки
            </Link>
          </div>
          <ClosePopupButton onButtonCloseClick={handleCloseButtonClick} />
        </div>
      </div>
    </div>

  );
}

const ProductRemoveModal = memo(ProductRemoveModalComponent);

export default ProductRemoveModal;
