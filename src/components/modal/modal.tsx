import classNames from 'classnames';
import { memo, KeyboardEvent } from 'react';
import { ESCAPE_KEY_NAME } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsActiveModalStatus, getIsReviewModalStatus, getIsSuccessReviewStatus, getIsProductAddModalStatus, getIsSuccessAddModalStatus } from '../../store/app-slice/selectors';
import { setModalActive, setProductAddModalActive, setReviewModalActive, setSuccessAddModalActive, setSuccessReviewModalActive } from '../../store/app-slice/app-slice';
import ProductReviewModal from '../review-modal/review-modal';
import ProductReviewThanks from '../review-thanks-modal/review-thanks-modal';
import AddProductModal from '../add-product-modal/add-product-modal';
import AddProductSuccessModal from '../add-product-success-modal/add-product-success-modal';

function ModalComponent():
  JSX.Element {

  const dispatch = useAppDispatch();

  function closeAllModal() {
    dispatch(setReviewModalActive(false));
    dispatch(setSuccessReviewModalActive(false));
    dispatch(setProductAddModalActive(false));
    dispatch(setSuccessAddModalActive(false));
    dispatch(setModalActive(false));
  }

  const isActiveModal = useAppSelector(getIsActiveModalStatus);

  const isReviewModalOpen = useAppSelector(getIsReviewModalStatus);

  const isSuccesAddModalOpen = useAppSelector(getIsSuccessReviewStatus);

  const isAddModalOpen = useAppSelector(getIsProductAddModalStatus);

  const isSuccessModalOpen = useAppSelector(getIsSuccessAddModalStatus);

  function handleOverlayClick() {
    closeAllModal();
  }

  function handleEscapeKeydown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === ESCAPE_KEY_NAME) {
      event.preventDefault();
      closeAllModal();
    }
  }

  return (
    <div
      className={classNames(
        'modal',
        { 'is-active': isActiveModal }
      )}
      onKeyDown={handleEscapeKeydown}
      data-testid="modal-wrapper"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} />

        {isReviewModalOpen && <ProductReviewModal />}
        {isSuccesAddModalOpen && <ProductReviewThanks />}
        {isAddModalOpen && <AddProductModal />}
        {isSuccessModalOpen && <AddProductSuccessModal />}

      </div>
    </div>
  );
}

const Modal = memo(ModalComponent);

export default Modal;
