import { memo, useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { setModalActive, setSuccessRemoveModalActive } from '../../store/modal-slice/modal-slice';
import ClosePopupButton from '../close-popup-button/close-popup-button';

function ProductSendThanksModalComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  function handleCatalogButtonClick() {
    dispatch(setModalActive(false));
    dispatch(setSuccessRemoveModalActive(false));
  }

  const handleCloseButtonClick = useCallback(() => {
    dispatch(setModalActive(false));
    dispatch(setSuccessRemoveModalActive(false));
  }, [dispatch]);

  return (
    <div className="modal__content">
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleCatalogButtonClick}
        >
          Вернуться к покупкам
        </button>
      </div>
      <ClosePopupButton onButtonCloseClick={handleCloseButtonClick} />
    </div>
  );
}

const ProductSendThanksModal = memo(ProductSendThanksModalComponent);

export default ProductSendThanksModal;
