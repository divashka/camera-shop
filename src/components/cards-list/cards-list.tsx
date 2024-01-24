import CardItem from '../card-item/card-item';
import { Product } from '../../types/types';

type CardsListProps = {
  products: Product[];
  className: string;
}

function CardsList({ products, className }: CardsListProps): JSX.Element {
  return (
    <div className={className}>
      {
        products.map((product) => (
          <CardItem key={product.id} product={product}></CardItem>
        ))
      }
    </div>
  );
}

export default CardsList;
