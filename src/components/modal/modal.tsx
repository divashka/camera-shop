import classNames from 'classnames';
import { memo, KeyboardEvent } from 'react';
import { ESCAPE_KEY_NAME } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsActiveModalStatus, getIsReviewModalStatus, getIsSuccessReviewStatus, getIsSuccessRemoveModalStatus, getIsRemoveModalStatus, getIsProductAddModalStatus, getIsSuccessAddModalStatus } from '../../store/modal-slice/selectors';
import { setModalActive, setRemoveModalActive, setSuccessRemoveModalActive, setProductAddModalActive, setReviewModalActive, setSuccessAddModalActive, setSuccessReviewModalActive } from '../../store/modal-slice/modal-slice';
import ProductReviewModal from '../review-modal/review-modal';
import ProductReviewThanks from '../review-thanks-modal/review-thanks-modal';
import AddProductModal from '../add-product-modal/add-product-modal';
import AddProductSuccessModal from '../add-product-success-modal/add-product-success-modal';
import ProductRemoveModal from '../remove-modal/remove-modal';
import ProductRemoveThanksModal from '../remove-modal-thanks/remove-modal-thanks';

function ModalComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  function closeAllModal() {
    dispatch(setRemoveModalActive(false));
    dispatch(setSuccessRemoveModalActive(false));
    dispatch(setReviewModalActive(false));
    dispatch(setSuccessReviewModalActive(false));
    dispatch(setProductAddModalActive(false));
    dispatch(setSuccessAddModalActive(false));
    dispatch(setModalActive(false));
  }

  const isActiveModal = useAppSelector(getIsActiveModalStatus);

  const isReviewModalOpen = useAppSelector(getIsReviewModalStatus);

  const isSuccesReviewModalOpen = useAppSelector(getIsSuccessReviewStatus);

  const isAddModalOpen = useAppSelector(getIsProductAddModalStatus);

  const isSuccessAddModalOpen = useAppSelector(getIsSuccessAddModalStatus);

  const isSuccessRemoveModalOpen = useAppSelector(getIsSuccessRemoveModalStatus);

  const isRemoveModalOpen = useAppSelector(getIsRemoveModalStatus);

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
        { 'modal--narrow': isSuccesReviewModalOpen || isSuccessAddModalOpen || isSuccessRemoveModalOpen }
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
        {isSuccessRemoveModalOpen && <ProductRemoveThanksModal />}

      </div>
    </div>
  );
}

const Modal = memo(ModalComponent);

export default Modal;
