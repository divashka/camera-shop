import { memo, ChangeEvent } from 'react';
import { ProductBasket } from '../../types';

type BasketCountProps = {
  product: ProductBasket;
  onIncreaseClick: (id: ProductBasket['id']) => void;
  onDecreaseClick: (id: ProductBasket['id']) => void;
  onCountChange: (event: ChangeEvent<HTMLInputElement>, id: ProductBasket['id']) => void;
}

function BasketCountComponent({ product, onIncreaseClick, onDecreaseClick, onCountChange }: BasketCountProps):JSX.Element {
  return (
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        aria-label="уменьшить количество товара"
        onClick={() => onDecreaseClick(product.id)}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter1" />
      <input
        type="number"
        id="counter1"
        min={1}
        max={99}
        aria-label="количество товара"
        value={product.count}
        onChange={(event) => onCountChange(event, product.id)}
      />
      <button
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
        onClick={() => onIncreaseClick(product.id)}
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
