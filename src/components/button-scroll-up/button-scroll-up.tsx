
import { memo } from 'react';

function ButtonScrollUpComponent(): JSX.Element {
  return (
    <a className="up-btn" href="#header">
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </a>
  );
}

const ButtonScrollUp = memo(ButtonScrollUpComponent);

export default ButtonScrollUp;
