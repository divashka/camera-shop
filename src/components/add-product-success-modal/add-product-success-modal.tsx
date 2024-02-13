import { memo, useCallback } from 'react';
import ClosePopupButton from '../close-popup-button/close-popup-button';
import { setModalActive, setSuccessAddModalActive } from '../../store/app-slice/app-slice';
import { useAppDispatch } from '../../hooks';

function AddProductSuccessModalComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  const handleCloseButtonClick = useCallback(() => {
    dispatch(setModalActive(false));
    dispatch(setSuccessAddModalActive(false));
  }, [dispatch]);

  return (
    <div className="modal__content"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <a className="btn btn--transparent modal__btn" href="#">
          Продолжить покупки
        </a>
        <button className="btn btn--purple modal__btn modal__btn--fit-width">
          Перейти в корзину
        </button>
      </div>
      <ClosePopupButton onButtonCloseClick={handleCloseButtonClick} />
    </div>
  );
}

const AddProductSuccessModal = memo(AddProductSuccessModalComponent);

export default AddProductSuccessModal;
