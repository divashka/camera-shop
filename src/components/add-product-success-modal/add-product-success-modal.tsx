import { memo, useCallback } from 'react';
import ClosePopupButton from '../close-popup-button/close-popup-button';
import { setModalActive, setSuccessAddModalActive } from '../../store/modal-slice/modal-slice';
import { useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const/const';
import { Link, useNavigate } from 'react-router-dom';

function AddProductSuccessModalComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const closeAddSuccessModal = useCallback(() => {
    dispatch(setModalActive(false));
    dispatch(setSuccessAddModalActive(false));
  }, [dispatch]);

  const handleCloseButtonClick = useCallback(() => {
    closeAddSuccessModal();
  }, [closeAddSuccessModal]);

  function handleBasketButtonClick() {
    closeAddSuccessModal();
    navigate(AppRoute.Basket);
  }

  function handleCatalogButtonClick() {
    closeAddSuccessModal();
  }

  return (
    <div className="modal__content"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <Link className="btn btn--transparent modal__btn" to={AppRoute.Root} onClick={handleCatalogButtonClick}>
          Продолжить покупки
        </Link>
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          onClick={handleBasketButtonClick}
        >
          Перейти в корзину
        </button>
      </div>
      <ClosePopupButton onButtonCloseClick={handleCloseButtonClick} />
    </div>
  );
}

const AddProductSuccessModal = memo(AddProductSuccessModalComponent);

export default AddProductSuccessModal;
