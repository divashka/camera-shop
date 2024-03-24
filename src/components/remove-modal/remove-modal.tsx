import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useAppDispatch } from '../../hooks';
import { deleteFromCart, setRemoveModalActive, setSuccessRemoveModalActive } from '../../store/app-slice/app-slice';

function ProductRemoveModalComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  function handleDeleteButtonClick() {
    dispatch(deleteFromCart);
    dispatch(setRemoveModalActive(false));
    dispatch(setSuccessRemoveModalActive(true));
  }

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/orlenok.webp, img/content/orlenok@2x.webp 2x"
                />
                <img
                  src="img/content/orlenok.jpg"
                  srcSet="img/content/orlenok@2x.jpg 2x"
                  width={140}
                  height={120}
                  alt="Фотоаппарат «Орлёнок»"
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">Орлёнок</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{}
                  <span className="basket-item__number">O78DFGSD832</span>
                </li>
                <li className="basket-item__list-item">Плёночная фотокамера</li>
                <li className="basket-item__list-item">Любительский уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              onClick={handleDeleteButtonClick}
            >
              Удалить
            </button>
            <Link
              className="btn btn--transparent modal__btn modal__btn--half-width"
              to={AppRoute.Root}
            >
              Продолжить покупки
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}

const ProductRemoveModal = memo(ProductRemoveModalComponent);

export default ProductRemoveModal;
