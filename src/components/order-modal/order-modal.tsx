import { memo, useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { setModalActive, setSuccessOrderModalActive } from '../../store/modal-slice/modal-slice';
import ClosePopupButton from '../close-popup-button/close-popup-button';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/const';

type ProductOrderModalProps = {
  error: boolean;
}

function ProductOrderModalComponent({ error }: ProductOrderModalProps): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeOrderModal = useCallback(() => {
    dispatch(setModalActive(false));
    dispatch(setSuccessOrderModalActive(false));
  }, [dispatch]);

  function handleCatalogButtonClick() {
    if (!error) {
      closeOrderModal();
      navigate(AppRoute.Root);
    } else {
      closeOrderModal();
    }
  }

  const handleCloseButtonClick = useCallback(() => {
    closeOrderModal();
  }, [closeOrderModal]);

  return (
    <div className="modal__content">
      <p className="title title--h4">{error ? 'Не удалось отправить данные' : 'Спасибо за покупку'}</p>
      {!error &&
        <svg className="modal__icon" width={80} height={78} aria-hidden="true">
          <use xlinkHref="#icon-review-success" />
        </svg>}
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleCatalogButtonClick}
        >
          {error ? 'Попробовать ещё раз' : 'Вернуться к покупкам'}
        </button>
      </div>
      <ClosePopupButton onButtonCloseClick={handleCloseButtonClick} />
    </div>
  );
}

const ProductOrderModal = memo(ProductOrderModalComponent);

export default ProductOrderModal;
