import classNames from 'classnames';
import { memo, KeyboardEvent } from 'react';
import { ESCAPE_KEY_NAME } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsActiveModalStatus, getIsReviewModalStatus, getIsSuccessReviewStatus, getIsSuccessOrderModalStatus, getIsRemoveModalStatus, getIsProductAddModalStatus, getIsSuccessAddModalStatus, getIsErrorOrderModalStatus } from '../../store/modal-slice/selectors';
import { setModalActive, setRemoveModalActive, setSuccessOrderModalActive, setProductAddModalActive, setReviewModalActive, setSuccessAddModalActive, setSuccessReviewModalActive, setErrorOrderModalActive } from '../../store/modal-slice/modal-slice';
import ProductReviewModal from '../review-modal/review-modal';
import ProductReviewThanks from '../review-thanks-modal/review-thanks-modal';
import AddProductModal from '../add-product-modal/add-product-modal';
import AddProductSuccessModal from '../add-product-success-modal/add-product-success-modal';
import ProductRemoveModal from '../remove-modal/remove-modal';
import ProductOrderModal from '../order-modal/order-modal';

function ModalComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  function closeAllModal() {
    dispatch(setRemoveModalActive(false));
    dispatch(setSuccessOrderModalActive(false));
    dispatch(setReviewModalActive(false));
    dispatch(setSuccessReviewModalActive(false));
    dispatch(setProductAddModalActive(false));
    dispatch(setSuccessAddModalActive(false));
    dispatch(setErrorOrderModalActive(false));
    dispatch(setModalActive(false));
  }

  const isActiveModal = useAppSelector(getIsActiveModalStatus);

  const isReviewModalOpen = useAppSelector(getIsReviewModalStatus);

  const isSuccesReviewModalOpen = useAppSelector(getIsSuccessReviewStatus);

  const isAddModalOpen = useAppSelector(getIsProductAddModalStatus);

  const isSuccessAddModalOpen = useAppSelector(getIsSuccessAddModalStatus);

  const isSuccessOrderModalOpen = useAppSelector(getIsSuccessOrderModalStatus);

  const isRemoveModalOpen = useAppSelector(getIsRemoveModalStatus);

  const isErrorOrderModalOpen = useAppSelector(getIsErrorOrderModalStatus);

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
        { 'is-active': isActiveModal },
        { 'modal--narrow': isSuccesReviewModalOpen || isSuccessAddModalOpen || isSuccessOrderModalOpen }
      )}
      onKeyDown={handleEscapeKeydown}
      data-testid="modal-wrapper"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} />

        {isReviewModalOpen && <ProductReviewModal />}
        {isSuccesReviewModalOpen && <ProductReviewThanks />}
        {isAddModalOpen && <AddProductModal />}
        {isSuccessAddModalOpen && <AddProductSuccessModal />}
        {isRemoveModalOpen && <ProductRemoveModal />}
        {isSuccessOrderModalOpen && <ProductOrderModal error={false} />}
        {isErrorOrderModalOpen && <ProductOrderModal error />}

      </div>
    </div>
  );
}

const Modal = memo(ModalComponent);

export default Modal;
