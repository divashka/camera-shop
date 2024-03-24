import { memo } from 'react';
import { useAppDispatch } from '../../hooks';
import { setModalActive, setSuccessRemoveModalActive } from '../../store/app-slice/app-slice';

function ProductRemoveThanksModalComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  function handleCatalogButtonClick() {
    dispatch(setModalActive(false));
    dispatch(setSuccessRemoveModalActive(false));
  }

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
      <button className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

const ProductRemoveThanksModal = memo(ProductRemoveThanksModalComponent);

export default ProductRemoveThanksModal;
