import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { setModalActive } from '../../store/app-slice/app-slice';
import { useAppDispatch } from '../../hooks';

function ProductReviewThanks(): JSX.Element {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function handleReturnButtonClick() {
    navigate(AppRoute.Root);
    dispatch(setModalActive());
  }

  return (
    <>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleReturnButtonClick}
        >
          Вернуться к покупкам
        </button>
      </div>
    </>
  );
}

export default ProductReviewThanks;
