
import { memo } from 'react';

function ButtonScrollUpComponent(): JSX.Element {

  function handleUpButtonClick() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <a
      className="up-btn"
      onClick={handleUpButtonClick}
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </a>
  );
}

const ButtonScrollUp = memo(ButtonScrollUpComponent);

export default ButtonScrollUp;
