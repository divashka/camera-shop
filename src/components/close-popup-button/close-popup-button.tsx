import { memo } from 'react';

import { useAppDispatch } from '../../hooks';
import { setModalActive } from '../../store/app-slice/app-slice';

function ClosePopupButtonComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  function handleCloseButtonClick() {
    dispatch(setModalActive());
  }

  return (
    <button
      className="cross-btn"
      type="button"
      aria-label="Закрыть попап"
      onClick={handleCloseButtonClick}
    >
      <svg width={10} height={10} aria-hidden="true">
        <use xlinkHref="#icon-close" />
      </svg>
    </button>
  );
}

const ClosePopupButton = memo(ClosePopupButtonComponent);

export default ClosePopupButton;
