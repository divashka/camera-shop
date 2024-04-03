import { memo, ChangeEvent } from 'react';
import { ProductBasket } from '../../types';
import {
  MAX_COUNT_PRODUCTS,
  MIN_COUNT_PRODUCTS,
  ChangeProductCount,
} from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeProductCountInBasket } from '../../store/app-slice/app-slice';
import { getProductsFromCart } from '../../store/app-slice/selectors';

type BasketCountProps = {
  product: ProductBasket;
};

function BasketCountComponent({ product }: BasketCountProps): JSX.Element {

  const products = useAppSelector(getProductsFromCart);

  const AllProductsCount = products.reduce(
    (count, prod) => count + +prod.count,
    0
  );

  const productsCount = products
    .filter((prod) => prod.id !== product.id)
    .reduce((count, prod) => count + Number(prod.count), 0);

  const dispatch = useAppDispatch();

  function handleIncreaseButtonClick() {
    dispatch(
      changeProductCountInBasket({
        type: ChangeProductCount.Increase,
        id: product.id,
      })
    );
  }

  function handleDecreaseButtonClick() {
    dispatch(
      changeProductCountInBasket({
        type: ChangeProductCount.Decrease,
        id: product.id,
      })
    );
  }

  function handleCountChange(event: ChangeEvent<HTMLInputElement>) {
    const currentValue = +event.target.value;

    if (/[^0-9]/.test(event.target.value)) {
      return;
    }

    console.log(MAX_COUNT_PRODUCTS - productsCount)

    const value =
      currentValue + productsCount >= MAX_COUNT_PRODUCTS
        ? MAX_COUNT_PRODUCTS - productsCount
        : currentValue;
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
        disabled={Number(product.count) === MIN_COUNT_PRODUCTS || Number(product.count) === 0}
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
        disabled={AllProductsCount >= MAX_COUNT_PRODUCTS}
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