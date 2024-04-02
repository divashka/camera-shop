import { memo, ChangeEvent } from 'react';
import { ProductBasket } from '../../types';
import { MAX_COUNT_PRODUCTS, MIN_COUNT_PRODUCTS, ChangeProductCount } from '../../const/const';
import { useAppDispatch } from '../../hooks';
import { changeProductCountInBasket } from '../../store/app-slice/app-slice';

type BasketCountProps = {
  product: ProductBasket;
}

function BasketCountComponent({ product }: BasketCountProps): JSX.Element {

  const dispatch = useAppDispatch();

  function handleIncreaseButtonClick() {
    dispatch(changeProductCountInBasket({ type: ChangeProductCount.Increase, id: product.id }));
  }

  function handleDecreaseButtonClick(){
    dispatch(changeProductCountInBasket({ type: ChangeProductCount.Decrease, id: product.id }));
  }

  function handleCountChange(event: ChangeEvent<HTMLInputElement>) {
    if (/[A-Za-zА-яЁё]+/.test(event.target.value)) {
      return;
    }
    const value = Math.min(+event.target.value, MAX_COUNT_PRODUCTS);
    dispatch(changeProductCountInBasket({ id: product.id, count: value }));
  }

  function handleInputBlur() {
    if (product.count === '') {
      dispatch(changeProductCountInBasket({ id: product.id, count: 1 }));
    }
  }

  return (
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        aria-label="уменьшить количество товара"
        onClick={handleDecreaseButtonClick}
        disabled={Number(product.count) === MIN_COUNT_PRODUCTS}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter1" />
      <input
        type="string"
        id="counter1"
        aria-label="количество товара"
        value={product.count}
        onChange={(event) => handleCountChange(event)}
        onBlur={handleInputBlur}
      />
      <button
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
        onClick={handleIncreaseButtonClick}
        disabled={Number(product.count) === MAX_COUNT_PRODUCTS}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
}

const BasketCount = memo(BasketCountComponent);

export default BasketCount;
