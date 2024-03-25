import { memo, useCallback } from 'react';
import ClosePopupButton from '../close-popup-button/close-popup-button';
import { addToCart } from '../../store/app-slice/app-slice';
import { setModalActive, setProductAddModalActive, setSuccessAddModalActive } from '../../store/modal-slice/modal-slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getModalProductFromCart } from '../../store/app-slice/selectors';
import NotFound from '../../pages/not-found/not-found';
import { capitalizeFirstLetter } from '../../utils/utils';
import { NAME_PHOTOCAMERA_FROM_SERVER, NAME_PHOTOCAMERA } from '../../const/const';

function AddProductModalComponent(): JSX.Element {

  const product = useAppSelector(getModalProductFromCart);

  const dispatch = useAppDispatch();

  const handleCloseButtonClick = useCallback(() => {
    dispatch(setModalActive(false));
    dispatch(setProductAddModalActive(false));
  }, [dispatch]);

  if (product === null) {
    return <NotFound />;
  }

  function handleAddToCartButtonClick() {
    if (product) {
      dispatch(addToCart(product));
    }
    dispatch(setProductAddModalActive(false));
    dispatch(setSuccessAddModalActive(true));
  }

  const { vendorCode, name, type, level, category, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, price } = product;

  return (
    <div className="modal__content"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="title title--h4">Добавить товар в корзину</p>
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
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type} {category === NAME_PHOTOCAMERA_FROM_SERVER ? capitalizeFirstLetter(NAME_PHOTOCAMERA) : capitalizeFirstLetter(category)}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{price} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleAddToCartButtonClick}
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Добавить в корзину
        </button>
      </div>
      <ClosePopupButton onButtonCloseClick={handleCloseButtonClick} />
    </div>
  );
}

const AddProductModal = memo(AddProductModalComponent);

export default AddProductModal;
