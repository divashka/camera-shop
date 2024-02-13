import { memo } from 'react';

type ClosePopupButtonProps = {
  onButtonCloseClick: () => void;
}

function ClosePopupButtonComponent({ onButtonCloseClick }: ClosePopupButtonProps): JSX.Element {

  function handleCloseButtonClick() {
    onButtonCloseClick();
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
