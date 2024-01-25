import classNames from 'classnames';
import { memo, ReactNode, KeyboardEvent } from 'react';
import { ESCAPE_KEY_NAME } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsActiveModalStatus } from '../../store/app-slice/selectors';
import { setModalActive } from '../../store/app-slice/app-slice';

type ModalProps = {
  children: ReactNode;
}

function ModalComponent({ children }: ModalProps):
  JSX.Element {

  const dispatch = useAppDispatch();

  const isActiveModal = useAppSelector(getIsActiveModalStatus);

  function handleOverlayClick() {
    dispatch(setModalActive());
  }

  function handleEscapeKeydown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === ESCAPE_KEY_NAME) {
      event.preventDefault();
      dispatch(setModalActive());
    }
  }

  return (
    <div
      className={classNames(
        'modal',
        { 'is-active': isActiveModal }
      )}
      onKeyDown={handleEscapeKeydown}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} />
        <div className="modal__content"
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const Modal = memo(ModalComponent);

export default Modal;
